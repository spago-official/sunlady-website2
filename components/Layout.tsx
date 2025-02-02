import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Layout.module.css';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ヘッダー */}
      <header style={{
        backgroundColor: 'white',
        padding: '15px 0',
        borderBottom: '1px solid #eee',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* ロゴ部分 */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}>
            <Image
              src="/logo.png"
              alt="Sunlady Logo"
              width={180}
              height={40}
              priority
              style={{
                maxHeight: '40px',
                width: 'auto'
              }}
            />
          </Link>

          {/* ナビゲーション */}
          <nav style={{
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
          }}>
            <Link href="/" className={styles.navLink}>
              TOP
            </Link>
            <Link href="/news" className={styles.navLink}>
              NEWS
            </Link>
            <Link href="/partner" className={styles.navLink}>
              PARTNER
            </Link>
            <a 
              href="https://sunlady.base.shop/"
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              SHOP
            </a>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* フッター */}
      <footer style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <p>© 2024 Sunlady. All rights reserved.</p>
      </footer>
    </div>
  );
} 