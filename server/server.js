require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    res.status(response.status).json(response.data)
  } catch (err) {
    console.error(err.response?.data || err.message)
    res.status(err.response?.status || 500).json({ error: 'Proxy failed', details: err.response?.data || err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`)
})
