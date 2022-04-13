import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const ThankYou = () => {
  const router = useRouter();
  const { success } = router.query;

  return (
    <div className={styles.container}>
      {success !== undefined && (
        <h2 className={styles.title}>
          Thank you, your payment was successful!
        </h2>
      )}
    </div>
  );
};

export default ThankYou;
