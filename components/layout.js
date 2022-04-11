import Header from './header';
import Footer from './footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { Router } from '@material-ui/icons';

const Layout = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.homeLink}>
        {pathname !== '/' && (
          <Link href='/'>
            <a>&larr; Home</a>
          </Link>
        )}
      </div>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
