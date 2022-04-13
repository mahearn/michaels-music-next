import { useContext } from 'react';
import Link from 'next/link';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Context from '../store/context';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import styles from './styles/navbar.module.css';

const NavBar = (props) => {
  const { state, actions } = useContext(Context);
  const cart = actions({ type: 'GET_CART', payload: null });
  let cartItemCount = cart.cartContents.length;

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarGroup}>
        <div className={styles.branding}>
          <LibraryMusicIcon className={styles.logo} />
          <h1 className={styles.title}>Michael Ahearn</h1>
        </div>
        <ul className={styles.listGroup}>
          <li className={styles.listItem}>
            <Link href='/biography'>
              <a>About me</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href='/music-scores'>
              <a>Scores for sale</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href='/contact'>
              <a>Contact me</a>
            </Link>
          </li>
        </ul>
        <div className={styles.cartIconContainer}>
          <span className={styles.cartQuantityIndicator}>{cartItemCount}</span>
          <Link href='/shopping-cart'>
            <a>
              <ShoppingCartCheckoutOutlinedIcon className={styles.cartIcon} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
