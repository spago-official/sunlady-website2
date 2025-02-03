import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { fetchAllIds, fetchDataFromAPI } from '../../lib/api'; // 適切なパスに変更
import Link from 'next/link';
import Image from 'next/image';
import { News as MicroCMSNews } from '../../lib/microcms'; // 名前を変更してインポート
import { ParsedUrlQuery } from 'querystring';

type News = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};

type Props = {
  news: News;
};

export default function NewsDetail({ news }: Props) {
  return (
    <Layout>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '40px 20px' 
      }}>
        <div style={{ marginBottom: '30px' }}>
          <Link 
            href="/news"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#666',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s'
            }}
          >
            ← お知らせ一覧に戻る
          </Link>
        </div>

        <article>
          {news.image && (
            <div style={{ 
              marginBottom: '30px',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <Image
                src={news.image.url}
                alt={news.title}
                width={news.image.width}
                height={news.image.height}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <time 
              dateTime={news.publishedAt}
              style={{
                display: 'block',
                fontSize: '14px',
                color: '#666',
                marginBottom: '10px'
              }}
            >
              {new Date(news.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              {news.title}
            </h1>
          </div>

          <div 
            className="news-content"
            dangerouslySetInnerHTML={{ __html: news.content }}
            style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333',
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </article>
      </div>

      <style jsx global>{`
        .news-content {
          font-size: 16px;
          line-height: 1.8;
        }
        .news-content p {
          margin-bottom: 1em;
        }
        .news-content a {
          color: #0066cc;
          text-decoration: none;
          transition: color 0.3s;
        }
        .news-content a:hover {
          color: #004499;
          text-decoration: underline;
        }
        .news-content strong {
          font-weight: bold;
        }
        .news-content u {
          text-decoration: none;
          border-bottom: 1px solid currentColor;
        }
      `}</style>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await fetchAllIds(); // APIから全IDを取得
  console.log('Static Paths:', paths); // 取得したパスを確認
  return { paths, fallback: false };
};

interface Params extends ParsedUrlQuery {
  id: string; // idの型を指定
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params; // 型アサーションを使用

  console.log(`Fetching data for ID: ${id}`); // デバッグ用: IDを確認
  const data = await fetchDataFromAPI(id); // APIからデータを取得

  if (!data || !data.image) {
    console.log('Data not found or image missing'); // デバッグ用: データが見つからない場合
    return {
      notFound: true, // データがない場合は404ページを表示
    };
  }

  return {
    props: {
      news: data, // newsオブジェクト全体を渡す
    },
  };
}; 