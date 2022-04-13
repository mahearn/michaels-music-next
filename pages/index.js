import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.heroImage}>
      <Image
        src='/images/ricardo-gomez-angel-TPvLvY67VlI-unsplash.jpeg'
        alt='hero image'
        layout='fill'
        priority='true'
      />
      <h2 className={styles.heroTitle}>My Music</h2>
    </div>
  );
}
