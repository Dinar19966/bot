import Parser from 'rss-parser';
import OpenAI from 'openai';
import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config';

const parser = new Parser();

// 💡 OpenRouter вместо OpenAI (https://openrouter.ai)
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://github.com/Dinar19966', // укажи свой сайт или github
    'X-Title': 'NewsBot by Student',
  },
});

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

// Получаем последние 5 новостей
async function fetchNews(): Promise<Array<{ title: string; link: string }>> {
  const feed = await parser.parseURL('https://lenta.ru/rss/news');
  return feed.items.slice(0, 5).map(item => ({
    title: item.title ?? '',
    link: item.link ?? '',
  }));
}

// Обработка и сжатие новости с помощью OpenRouter
async function generateNews(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Ты новостной бот. Пиши кратко и по существу.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message?.content ?? '⚠️ Не удалось сгенерировать.';
  } catch (error) {
    console.error('OpenRouter error:', error);
    return '⚠️ Ошибка генерации текста.';
  }
}

// Отправка новости в Telegram
async function postToTelegram(message: string) {
  await bot.sendMessage(CHAT_ID, message, { disable_web_page_preview: false });
}

// Главный процесс
async function runNewsBot() {
  const newsItems = await fetchNews();

  for (const news of newsItems) {
    const prompt = `${news.title}. Сформулируй короткую суть. Подробнее: ${news.link}`;
    const summary = await generateNews(prompt);
    const message = `🗞 ${summary}\n🔗 ${news.link}`;
    await postToTelegram(message);
  }
}

runNewsBot().catch(console.error);
