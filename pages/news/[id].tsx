import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { client, News } from '../../lib/microcms';
import Link from 'next/link';

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
              <img
                src={news.image.url}
                alt={news.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
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
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: 100 }
    });

    const paths = data.contents.map((content: News) => ({
      params: {
        id: content.id
      }
    }));

    return {
      paths,
      fallback: true
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: true
    };
  }
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true };
  }

  try {
    const news = await client.get({
      endpoint: 'news',
      contentId: params.id
    });

    return {
      props: {
        news
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}; 