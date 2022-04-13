import LaunchIcon from '@mui/icons-material/Launch';
import styles from '../styles/Home.module.css';

const Biography = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Biography</h2>
      <div>
        <h3>My Influences</h3>
        <p>
          Nigel Butterley, Peter Maxwell Davies, Pierre Boulez, Wayne Shorter,
          Michael Hedges and the Wyndham Hill Records, New Age movement, and
          folk guitarists like Martin Carthy and Tony McManus.
        </p>
      </div>
      <a
        href='https://www.australianmusiccentre.com.au/artist/ahearn-michael'
        target='_blank'
        rel='noreferrer'
        className={styles.externalLink}
      >
        My Australian Music Centre page
      </a>{' '}
      <LaunchIcon />
    </div>
  );
};

export default Biography;
