export type NewsSource = {
  name: string;
  url: string;
  categories: string[];
  region: string;
  language: string;
  type?: "website" | "telegram" ;
};

// ================== По регионам ==================
export const US_SOURCES: NewsSource[] = [
  {
    name: "Bloomberg",
    url: "https://www.bloomberg.com",
    categories: ["markets", "economy", "investing"],
    region: "US",
    language: "en",
    type: "website" 
  },
  {
    name: "CNBC",
    url: "https://www.cnbc.com",
    categories: ["stocks", "personal finance", "crypto"],
    region: "US",
    language: "en",
    type: "website" 
  },
  {
    name: "Wall Street Journal",
    url: "https://www.wsj.com",
    categories: ["business", "markets", "economy"],
    region: "US",
    language: "en",
    type: "website" 
  },
];

export const EU_SOURCES: NewsSource[] = [
  {
    name: "Financial Times",
    url: "https://www.ft.com",
    categories: ["markets", "politics", "economy"],
    region: "EU",
    language: "en",
    type: "website" 
  },
  {
    name: "Reuters Europe",
    url: "https://www.reuters.com",
    categories: ["business", "markets"],
    region: "EU",
    language: "en",
    type: "website" 
  },
];

export const ASIA_SOURCES: NewsSource[] = [
  {
    name: "Nikkei Asia",
    url: "https://asia.nikkei.com",
    categories: ["markets", "economy"],
    region: "Asia",
    language: "en",
    type: "website" 
  },
  {
    name: "Caixin Global",
    url: "https://www.caixinglobal.com",
    categories: ["china", "markets"],
    region: "Asia",
    language: "en",
    type: "website" 
  },
];

// ================== По категориям ==================
export const MARKET_SOURCES: NewsSource[] = [
  {
    name: "Investing.com",
    url: "https://www.investing.com",
    categories: ["stocks", "forex", "crypto"],
    region: "Global",
    language: "en",
    type: "website" 
  },
  {
    name: "TradingView News",
    url: "https://www.tradingview.com/news/",
    categories: ["technical analysis", "stocks"],
    region: "Global",
    language: "en",
    type: "website" 
  },
];

export const CRYPTO_SOURCES: NewsSource[] = [
  {
    name: "CoinDesk",
    url: "https://www.coindesk.com",
    categories: ["crypto", "blockchain"],
    region: "Global",
    language: "en",
    type: "website" 
  },
  {
    name: "Cointelegraph",
    url: "https://cointelegraph.com",
    categories: ["crypto", "web3"],
    region: "Global",
    language: "en",
    type: "website" 
  },
];

export const PERSONAL_FINANCE_SOURCES: NewsSource[] = [
  {
    name: "NerdWallet",
    url: "https://www.nerdwallet.com",
    categories: ["personal finance", "investing"],
    region: "US",
    language: "en",
    type: "website" 
  },
  {
    name: "The Motley Fool",
    url: "https://www.fool.com",
    categories: ["stocks", "investing"],
    region: "US",
    language: "en",
    type: "website" 
  },
];

// ================== Все источники (для удобства) ==================
export const ALL_SOURCES: NewsSource[] = [
  ...US_SOURCES,
  ...EU_SOURCES,
  ...ASIA_SOURCES,
  ...MARKET_SOURCES,
  ...CRYPTO_SOURCES,
  ...PERSONAL_FINANCE_SOURCES,
];

// ================== Группировка для фильтрации ==================
export const SOURCES_BY_REGION: Record<string, NewsSource[]> = {
  US: US_SOURCES,
  EU: EU_SOURCES,
  Asia: ASIA_SOURCES,
};

export const SOURCES_BY_CATEGORY: Record<string, NewsSource[]> = {
  markets: MARKET_SOURCES,
  crypto: CRYPTO_SOURCES,
  personal_finance: PERSONAL_FINANCE_SOURCES,
};