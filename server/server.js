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

// Helper to extract followups from markdown code block
function extractFollowupsFromContent(content) {
  // Look for a code block with json array
  const match = content.match(/```json\\s*([\\s\\S]*?)```/i) || content.match(/```\\s*([\\s\\S]*?)```/i);
  if (match) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }
  // Fallback: look for a numbered or bulleted list
  const lines = content.split('\n').filter(l => l.match(/^[-*0-9.]/));
  if (lines.length >= 3) {
    return lines.slice(0, 3).map(l => l.replace(/^[-*0-9. ]+/, '').trim());
  }
  return [];
}

app.post('/api/chat', async (req, res) => {
  try {
    const { tool, extra, file, prompt: userPrompt } = req.body;
    if (!file?.file_data) {
      return res.status(400).json({ error: 'Missing file_data' });
    }

    // strip off "data:...;base64," prefix if present
    const b64 = file.file_data.split(',')[1] || file.file_data;
    const buffer = Buffer.from(b64, 'base64');
    const { text } = await pdfParse(buffer);

    // If userPrompt is present, use it directly (for chat/followups), else use tool logic
    let prompt;
    if (userPrompt) {
      prompt = userPrompt + "\n\nGive a list of 3 parsable JSON follow up questions.";
    } else {
      prompt = makePrompt(tool, text, extra) + "\n\nGive a list of 3 parsable JSON follow up questions.";
    }

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
    const followups = extractFollowupsFromContent(content);

    return res.json({ content, followups });
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
