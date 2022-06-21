import LaunchIcon from '@mui/icons-material/Launch';
import styles from '../styles/Home.module.css';

const Biography = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Biography</h2>
      <div>
        <p>
          I am a Web Front-end Engineer, Musician, Composer and teacher living
          in Sydney Australia. I have a Bachelor degree in music from University
          of Sydney, where I studied composition with Peter Sculthorpe and Eric
          Gross.
        </p>
        <p>
          My influences include Nigel Butterley, Peter Maxwell Davies, Pierre
          Boulez, Wayne Shorter, Michael Hedges and the Wyndham Hill Records,
          New Age movement, and folk guitarists like Martin Carthy and Nic
          Jones.
        </p>
        <p>
          You can find a representative sample of my music on the scores for
          sale page, including a link to my SoundCloud page, where you can
          listen to some of my music, performed by me and recorded by Marcus
          Holden in 1991.
        </p>
        <p>
          Here is a link to{' '}
          <a
            href='https://www.australianmusiccentre.com.au/artist/ahearn-michael'
            target='_blank'
            rel='noreferrer'
            className={styles.externalLink}
          >
            my Australian Music Centre page
          </a>{' '}
          <LaunchIcon />
        </p>
      </div>
    </div>
  );
};

export default Biography;
