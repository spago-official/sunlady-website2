/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { client, News } from '../../lib/microcms';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  news: News[];
};

export default function NewsPage({ news = [] }: Props) {
  return (
    <Layout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          お知らせ一覧
        </h1>

        <div style={{ 
          display: 'grid',
          gap: '30px',
        }}>
          {news.length > 0 ? (
            news.map((item) => (
              <div key={item.id} onClick={() => window.location.href = `/news/${item.id}`} style={{ cursor: 'pointer' }}>
                <article 
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    gap: '20px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                >
                  {item.image && (
                    <div style={{ 
                      flexShrink: 0,
                      width: '200px',
                      height: '150px'
                    }}>
                      <Image
                        src={item.image.url}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <time 
                      dateTime={item.publishedAt}
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '8px'
                      }}
                    >
                      {new Date(item.publishedAt).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <h2 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      color: '#333'
                    }}>
                      {item.title}
                    </h2>
                    <p style={{
                      color: '#666',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.content}
                    </p>
                  </div>
                </article>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#666' }}>
              現在、お知らせはありません。
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: { 
        orders: '-publishedAt',
        limit: 50
      }
    });

    return {
      props: {
        news: data.contents || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      props: {
        news: [],
      },
      revalidate: 60,
    };
  }
}; 