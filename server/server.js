// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const pdfParse = require('pdf-parse');

const app = express();
const PORT = process.env.PORT || 4000;
const MODEL = 'google/gemini-2.0-flash-001';

app.use(cors());
app.use(express.json({ limit: '50mb' })); // allow large PDF uploads

function makePrompt(tool, text, extra) {
  switch (tool) {
    case 'Summarize':
      return `Summarize the following document:\n\n${text}`;
    case 'Redact':
      return `Redact PII from the following document:\n\n${text}`;
    case 'Clause Finder':
      return `Find important clauses${extra ? ` related to "${extra}"` : ''} in the following document:\n\n${text}`;
    case 'Chat with Document':
      return `You are chatting with the content of this document:\n\n${text}`;
    case 'Analyze Risk':
      return `Analyze the legal risk in this document:\n\n${text}`;
    default:
      return text;
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { tool, extra, file } = req.body;
    if (!tool || !file?.file_data) {
      return res.status(400).json({ error: 'Missing tool or file_data' });
    }

    // strip off "data:...;base64," prefix if present
    const b64 = file.file_data.split(',')[1] || file.file_data;
    const buffer = Buffer.from(b64, 'base64');
    const { text } = await pdfParse(buffer);

    const prompt = makePrompt(tool, text, extra);
    const apiRes = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
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
