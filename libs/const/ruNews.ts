export type NewsSource = {
  name: string;
  url: string;
  rss?: string; // RSS-лента (только для type="website")
  categories: string[];
  region: string;
  language: string;
  type?: "website" | "telegram";
};

export const RU_SOURCES: NewsSource[] = [
  // 🔹 Сайты с RSS
  {
    name: "РБК",
    url: "https://www.rbc.ru/finances",
    rss: "https://www.rbc.ru/rbcfreenews.rss",
    categories: ["markets", "economy", "business"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "Коммерсантъ Финансы",
    url: "https://www.kommersant.ru/finance",
    rss: "https://www.kommersant.ru/RSS/finance.xml",
    categories: ["markets", "banking", "investing"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "Investing.com (RU)",
    url: "https://ru.investing.com",
    rss: "https://ru.investing.com/rss/news.rss",
    categories: ["stocks", "crypto", "forex"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "Банки.ру",
    url: "https://www.banki.ru/news",
    rss: "https://www.banki.ru/xml/news.rss",
    categories: ["banking", "personal finance"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "ForkLog",
    url: "https://forklog.com",
    rss: "https://forklog.com/feed/",
    categories: ["crypto", "blockchain"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "Finam",
    url: "https://www.finam.ru/analysis/",
    rss: "https://www.finam.ru/net/analysis/rsspoint/",
    categories: ["stocks", "analytics", "economy"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "ТАСС Финансы",
    url: "https://tass.ru/ekonomika-i-biznes",
    rss: "https://tass.ru/rss/v2.xml",
    categories: ["business", "economy", "finance"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "РИА Новости Финансы",
    url: "https://ria.ru/economy/",
    rss: "https://ria.ru/export/rss2/economy/index.xml",
    categories: ["economy", "political economics"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "Мосбиржа (новости)",
    url: "https://www.moex.com/ru/news/",
    rss: "https://www.moex.com/ru/news/rss/",
    categories: ["markets", "stocks", "regulation"],
    region: "RU",
    language: "ru",
    type: "website",
  },

  // 🔹 Сайты без RSS (убраны из парсера)
  {
    name: "Bits.media",
    url: "https://bits.media",
    categories: ["crypto", "mining"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "BCS Express",
    url: "https://bcs-express.ru/novosti-i-analitika",
    categories: ["stocks", "economy", "markets"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "Тинькофф Журнал",
    url: "https://journal.tinkoff.ru/tag/finance/",
    categories: ["personal finance", "investing"],
    region: "RU",
    language: "ru",
    type: "website",
  },
]
export const RU_SOURCES2: NewsSource[] =[
  {
    name: "ЦБ РФ – новости",
    url: "https://www.cbr.ru/press/",
    categories: ["regulation", "banking", "macroeconomics"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "Crypto.ru",
    url: "https://crypto.ru/category/news/",
    categories: ["crypto", "blockchain", "mining"],
    region: "RU",
    language: "ru",
    type: "website",
  },
  {
    name: "Точка зрения (Альфа-Банк)",
    url: "https://alfabank.ru/tz/",
    categories: ["analytics", "macro", "investing"],
    region: "RU",
    language: "ru",
    type: "website",
  },

  // 🔹 Telegram-каналы (RSS не поддерживается)
  {
    name: "Читать доход",
    url: "https://t.me/chitatdohod",
    categories: ["investing", "stocks", "analysis"],
    region: "RU",
    language: "ru",
    type: "telegram",
  },
  {
    name: "Беспощадный пикап",
    url: "https://t.me/pikabu_daily",
    categories: ["stocks", "humor", "markets"],
    region: "RU",
    language: "ru",
    type: "telegram",
  },
  {
    name: "Криптовалюта — Новости и Аналитика",
    url: "https://t.me/criptovalyta_news",
    categories: ["crypto", "blockchain"],
    region: "RU",
    language: "ru",
    type: "telegram",
  },
  {
    name: "Инвест Фьючер",
    url: "https://t.me/investfuture",
    categories: ["investing", "markets", "education"],
    region: "RU",
    language: "ru",
    type: "telegram",
  },
  {
    name: "Минфин | Новости",
    url: "https://t.me/minfinru",
    categories: ["finance", "macro", "politics"],
    region: "RU",
    language: "ru",
    type: "telegram",
  },
  {
    name: "Крипто Котел",
    url: "https://t.me/cryptokotel",
    categories: ["crypto", "news", "analytics"],
    region: "RU",
    language: "ru",
    type: "telegram",
  },
  {
    name: "Финансовая свобода",
    url: "https://t.me/finsvoboda",
    categories: ["personal finance", "investing", "mindset"],
    region: "RU",
    language: "ru",
    type: "telegram",
  },
];