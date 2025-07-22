import Parser from 'rss-parser';
import OpenAI from 'openai';
import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config';
import { RU_SOURCES } from './libs/const/ruNews';


const parser = new Parser();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://github.com/Dinar19966',
    'X-Title': 'NewsBot Pro',
  },
});

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

type NewsItem = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
};

// ⏳ Вспомогательная функция — получить дату вчера
function getYesterdayDate(): string {
  const d = new Date();
  d.setDate(d.getDate() -1 );
  return d.toISOString().split('T')[0];
}

// 📥 Собираем только вчерашние новости
async function fetchYesterdayNews(): Promise<NewsItem[]> {
  const yesterday = getYesterdayDate();
  const allNews: NewsItem[] = [];

  for (const source of RU_SOURCES) {
    if (!source.rss) continue;
    try {
      const feed = await parser.parseURL(source.rss);
      const filtered = (feed.items || []).filter(item => {
        const pubDate = item.isoDate || item.pubDate;
        if (!pubDate) return false;
        return pubDate.startsWith(yesterday);
      }).map(item => ({
        title: item.title ?? 'Без названия',
        link: item.link ?? '#',
        source: source.name,
        pubDate: item.isoDate || item.pubDate || '',
      }));
      allNews.push(...filtered);
    } catch (err) {
      console.error(`Ошибка загрузки с ${source.name}:`, err);
    }
  }

  return allNews;
}

// 🧠 Генерация аналитической сводки
async function generateDailyAnalyticalDigest(newsItems: NewsItem[]): Promise<string> {
  if (!newsItems.length) return '⚠️ За вчерашний день не найдено важных новостей.';

  const date = getYesterdayDate().split('-').reverse().join('.');
  const newsList = newsItems.map((item, idx) =>
    `${idx + 1}. [${item.source}] ${item.title} (${item.link})`
  ).join('\n');
  

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
Ты опытный аналитик и редактор. Составь *аналитическую сводку* ключевых новостей за ${date}. Бери самые важные новости, возможно будут совпадения, можешь переписать своими словами.
Формат:
📅 *Аналитика за ${date}:*

- [Развернутое изложение по теме, с использованием тикеров(при наличии) ] (источник)
- ...

Только по представленным новостям. Анализируй влияние на политику, экономику, общество.
          `.trim()
        },
        {
          role: 'user',
          content: `Вот список новостей:\n\n${newsList}`
        }
      ],
      temperature: 0.7,
      max_tokens: 5000
    });

    return response.choices[0]?.message?.content || '⚠️ Не удалось сгенерировать аналитическую сводку.';
  } catch (err) {
    console.error('Ошибка генерации сводки:', err);
    return '⚠️ Произошла ошибка при создании аналитической сводки.';
  }
}

// 📤 Отправка в Telegram
async function sendToTelegram(message: string) {
  try {
    await bot.sendMessage(CHAT_ID, message, {
      parse_mode: 'Markdown',
      disable_web_page_preview: false,
    });
  } catch (err) {
    console.error('Ошибка отправки в Telegram:', err);
  }
}

// 🚀 Основной запуск
async function runDailyDigestBot() {
  try {
    console.log('📡 Сбор новостей...');
    const news = await fetchYesterdayNews();

    console.log('🧠 Генерация сводки...');
    const digest = await generateDailyAnalyticalDigest(news);

    console.log('📤 Отправка...');
    await sendToTelegram(digest);

    console.log('✅ Завершено. Кол-во новостей:', news.length);
  } catch (err) {
    console.error('Фатальная ошибка:', err);
    await sendToTelegram('⚠️ Произошла критическая ошибка при создании сводки.');
  }
}

runDailyDigestBot();
