import { createClient } from 'microcms-js-sdk';

// process.env の型定義のために @types/node をインストール
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MICROCMS_API_KEY: string;
    }
  }
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// APIクライアントの作成
export const client = createClient({
  serviceDomain: 'sunladyhome',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// パートナー情報の型定義
export interface Partner {
  id: string;
  name: string;
  subtitle?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  link?: string;
}

// ニュース情報の型定義
export interface News {
  id: string;
  title: string;
  content: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  publishedAt: string;
  updatedAt: string;
}

// レスポンスの型定義
export type MicroCMSResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type NewsResponse = MicroCMSResponse<News>;
export type PartnersResponse = MicroCMSResponse<Partner>;

// パートナー情報を取得する関数
export const getPartners = async () => {
  const response = await client.get<PartnersResponse>({
    endpoint: 'partner', // パートナー用エンドポイント
  });
  return response;
};
// ニュース記事を取得する関数
export const getNews = async () => {
  const response = await client.get<NewsResponse>({
    endpoint: 'news', // ニュース用エンドポイント
  });
  return response;
};

// カルーセル用のニュース記事を取得する関数
export const getCarouselNews = async () => {
  const response = await client.get<NewsResponse>({
    endpoint: 'news',
    queries: {
      filters: 'isCarousel[equals]true',
      orders: '-publishedAt',
      limit: 3,
    },
  });
  return response;
};

// 例: 名前空間を使用しない形に変更
export interface MyInterface {
  // プロパティの定義
}

export const myFunction = () => {
  // 関数の実装
}; 
