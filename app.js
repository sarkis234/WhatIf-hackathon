const express = require('express');
const app = express();
const port = 3600;
const fetch = require('node-fetch');

require('dotenv').config();

const API_KEY = process.env.API_KEY; // Замените на реальный ключ
const API_URL = 'https://api.intelligence.io.solutions/api/v1/chat/completions';

app.use(express.json());

app.listen(port, () => console.log(`Сервер запущен по адресу http://localhost:${port}`));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/ai-connection.js', (req, res) => {
  res.sendFile(__dirname + '/public/ai-connection.js');
});

app.get('/ask/:text', async (req, res) => {
  const text = req.url.split('/')[2];

  let answer;

  // getDeepSeekResponse(text)

  async function handleResponse() {
  try {
    answer = await getDeepSeekResponse(text); // Ждём ответ
    console.log("Ответ DeepSeek:", answer);
    res.send(answer);
  } catch (err) {
    console.error("Ошибка:", err);
  }
}

handleResponse();

  // console.log(getDeepSeekResponse(text));
});

async function getDeepSeekResponse(userMessage) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-R1", // Указываем модель
      messages: [
        // { role: "system", content: "Ты полезный AI-ассистент." }, // Опционально
        { role: "user", content: userMessage }, // Ваш запрос
      ],
      temperature: 0.7, // Контроль случайности ответа (0-1)
      max_tokens: 1000, // Максимальная длина ответа
      reasoning_content: false
    }),
  });

  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status}`);
  }

  const data = await response.json();
  // console.log(data.choices[0].message.content.split('</think>')[1]);
  return data.choices[0].message.content.split('</think>')[1]; // Получаем ответ
}


// getDeepSeekResponse("Привет! Как дела?")
//   .then((reply) => console.log("Ответ DeepSeek:", reply))
//   .catch((err) => console.error("Ошибка:", err));
