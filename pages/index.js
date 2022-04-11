import Link from 'next/link';
import Stripe from 'stripe';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        My Music <LibraryMusicIcon />
      </h2>
      <Link href='/music-scores'>
        <a className={styles.description}>
          Browse and purchase original sheet music here.
        </a>
      </Link>
    </div>
  );
}
