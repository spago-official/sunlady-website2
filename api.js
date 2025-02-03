const API_KEY = 'あなたのAPIキー';
const API_ENDPOINT = 'https://sunladyhome.microcms.io/api/v1';

// ニュース記事を取得
async function getNews() {
  const res = await fetch(`${API_ENDPOINT}/news`, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY
    }
  });
  return res.json();
}

// カルーセル用の最新記事を取得
async function getCarouselNews() {
  const res = await fetch(`${API_ENDPOINT}/news?filters=isCarousel[equals]true&orders=-publishedAt&limit=3`, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY
    }
  });
  return res.json();
}

// パートナー企業を取得
async function getPartners() {
  const res = await fetch(`${API_ENDPOINT}/partner`, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY
    }
  });
  return res.json();
} 