export const fetchAllIds = async () => {
  const response = await fetch('https://sunladyhome.microcms.io/api/v1/news', {
    headers: {
      'X-MICROCMS-API-KEY': 'K0ZXLrWfikAQ5rfWqpn3qW9WfsHyCsfrZ6gC' // 有効なAPIキーを設定
    }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  console.log('API Response:', data); // APIレスポンスを確認
  const paths = data.contents.map((item: { id: string }) => ({ params: { id: item.id } }));
  console.log('Paths:', paths); // 取得したIDを確認
  return paths; // IDを取得して返す
};

export const fetchDataFromAPI = async (id: string) => {
  const response = await fetch(`https://sunladyhome.microcms.io/api/v1/news/${id}`, {
    headers: {
      'X-MICROCMS-API-KEY': 'K0ZXLrWfikAQ5rfWqpn3qW9WfsHyCsfrZ6gC' // ここに正しいAPIキーを設定
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}; 