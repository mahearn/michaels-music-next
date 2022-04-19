import Header from './header';
import Footer from './footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Layout = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      <Header />
      <div
        className={` ${styles.container} ${
          pathname === '/' ? styles.containerHome : ''
        }`}
      >
        {pathname !== '/' && (
          <Link href='/'>
            <a>&larr; Home</a>
          </Link>
        )}
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
