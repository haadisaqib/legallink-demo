// server.js
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const axios    = require('axios');
const pdfParse = require('pdf-parse');

const app   = express();
const PORT  = process.env.PORT || 4000;
const MODEL = 'google/gemini-2.0-flash-001';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/api/chat', async (req, res) => {
  try {
    const { files, prompt: userPrompt } = req.body;
    if (!files?.length) {
      return res.status(400).json({ error: 'No files provided' });
    }

    // 1) extract text from each PDF
    const allTexts = await Promise.all(
      files.map(async (file) => {
        const b64 = file.file_data.split(',')[1] || file.file_data;
        const buffer = Buffer.from(b64, 'base64');
        const { text } = await pdfParse(buffer);
        return `=== ${file.filename} ===\n${text.trim()}`;
      })
    );

    // 2) combine into one big block
    const combinedText = allTexts.join('\n\n');

    // 3) build the LLM prompt including the PDF contents
    const finalPrompt = `
Here are the contents of the uploaded documents:

${combinedText}

User’s question:
${userPrompt}
    `.trim();

    // 4) call the OpenRouter API
    const apiRes = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: MODEL,
        messages: [{ role: 'user', content: finalPrompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = apiRes.data.choices?.[0]?.message?.content || '';
    return res.json({ content });
  } catch (err) {
    console.error(err.response?.data || err.message);
    const status = err.response?.status || 500;
    return res.status(status).json({
      error: 'Proxy failed',
      details: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`↪️  Proxy server running at http://localhost:${PORT}`);
});
