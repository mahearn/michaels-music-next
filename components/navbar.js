import { useContext } from 'react';
import Link from 'next/link';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Context from '../store/context';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import styles from './styles/navbar.module.css';

const NavBar = (props) => {
  const { state, actions } = useContext(Context);
  const cart = actions({ type: 'GET_CART', payload: null });
  const cartItemCount = cart.cartContents.length;
  const cartTotal = cart.total;

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarGroup}>
        <div className={styles.branding}>
          <LibraryMusicIcon className={styles.logo} />
          <h1 className={styles.title}>Michael Ahearn</h1>
        </div>
        {/* hamburger menu button */}
        {/* <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='navicon'></span>
        </label> */}
        <div className={styles.cartIconContainer}>
          <Link href='/shopping-cart'>
            <a>
              <ShoppingCartCheckoutOutlinedIcon className={styles.cartIcon} />
            </a>
          </Link>
          {cartTotal > 0 && (
            <div className={styles.cartTotal}>
              ${Number(cartTotal / 100).toFixed(2)}
            </div>
          )}
          <div className={styles.cartTotal}>({cartItemCount})</div>
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
            <Link href='/shopping-cart'>
              <a>My Cart</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href='/contact'>
              <a>Contact me</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
