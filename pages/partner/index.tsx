import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { client, Partner } from '../../lib/microcms';

type Props = {
  partners: Partner[];
};

export default function PartnerPage({ partners = [] }: Props) {
  return (
    <Layout>
      <div style={{ padding: '40px 20px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          パートナー企業一覧
        </h1>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {partners.length > 0 ? (
            partners.map((partner) => (
              <div key={partner.id} style={{ 
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
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
                {partner.image && (
                  <div style={{ 
                    height: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    width: '100%'
                  }}>
                    <img 
                      src={partner.image.url} 
                      alt={partner.name}
                      style={{ 
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                )}
                <h2 style={{ 
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: '#333'
                }}>
                  {partner.name}
                </h2>
                {partner.subtitle && (
                  <p style={{ 
                    color: '#666',
                    marginBottom: '20px',
                    fontSize: '14px',
                    lineHeight: '1.6'
                  }}>
                    {partner.subtitle}
                  </p>
                )}
                {partner.link && (
                  <a 
                    href={partner.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      backgroundColor: '#333',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      transition: 'background-color 0.3s',
                      marginTop: 'auto'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#555'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
                  >
                    公式サイトへ
                  </a>
                )}
              </div>
            ))
          ) : (
            <p style={{ 
              textAlign: 'center', 
              color: '#666',
              gridColumn: '1 / -1',
              padding: '40px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              現在、パートナー企業の情報はありません。
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
      endpoint: 'partner',
    });

    return {
      props: {
        partners: data.contents || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching partners:', error);
    return {
      props: {
        partners: [],
      },
      revalidate: 60,
    };
  }
};

