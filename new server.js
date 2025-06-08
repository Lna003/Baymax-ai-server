
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// إعداد OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// نقطة البداية
app.get('/', (req, res) => {
  res.send('BEMAX AI server is running 🤖✨');
});

// نقطة API للذكاء الصناعي
app.post('/ask', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'السؤال مطلوب.' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error with OpenAI API:', error.message);
    res.status(500).json({ error: 'حدث خطأ أثناء الاتصال بالذكاء الصناعي.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
