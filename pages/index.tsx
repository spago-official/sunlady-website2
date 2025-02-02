import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { client } from '../lib/microcms';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

type News = {
  id: string;
  title: string;
  content: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  publishedAt: string;
};

type Props = {
  news: News[];
};

export default function Home({ news = [] }: Props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true
  };

  return (
    <Layout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            新着情報
          </h2>
          {news.length > 0 ? (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Slider {...settings}>
                {news.map((item) => (
                  <div key={item.id} style={{ padding: '10px' }}>
                    <Link 
                      href={`/news/${item.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block'
                      }}
                    >
                      <div style={{
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        padding: '20px',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        minHeight: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
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
                            marginBottom: '15px',
                            height: '250px',
                            position: 'relative'
                          }}>
                            <img
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
                          <h3 style={{ 
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            color: '#333'
                          }}>
                            {item.title}
                          </h3>
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
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#666' }}>
              現在、表示できるニュースはありません。
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
        limit: 10  // 最新10件を取得
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