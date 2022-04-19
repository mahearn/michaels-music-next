import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Context from '../store/context';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Squash as Hamburger } from 'hamburger-react';
import styles from './styles/navbar.module.css';
import { autocompleteClasses } from '@mui/material';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

const NavBar = (props) => {
  const { state, actions } = useContext(Context);
  const [isOpen, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState('');
  const cart = actions({ type: 'GET_CART', payload: null });
  const cartItemCount = cart.cartContents.length;
  const cartTotal = cart.total;

  function stickyNavbar() {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 120 ? setIsSticky('stickyNav') : setIsSticky('');
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', stickyNavbar);
    return () => window.removeEventListener('scroll', stickyNavbar);
  }, []);

  const mobileMenuWrapper = {
    position: 'fixed',
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
    top: '54px',
    left: !isOpen ? '-100%' : '0',
    transition: 'left 0.5s ease-in-out',
    zIndex: '9999',
    padding: '12px',
    backgroundColor: 'ghostwhite',
    listGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1em',
      fontSize: '1.5em',
      fontWeight: '400',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      listStyleType: 'none',
    },
    listItem: {},
  };

  return (
    <>
      <nav
        className={`${styles.navbarContainer} ${
          isSticky === 'stickyNav' && styles.stickyNav
        }`}
      >
        <div className={styles.navbarGroup}>
          <div className={styles.branding}>
            <LibraryMusicIcon className={styles.logo} />
            <h1 className={styles.companyName}>Michael Ahearn</h1>
          </div>
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
          <div className={styles.hamburgerWrapper}>
            <Hamburger toggled={isOpen} toggle={setOpen} />
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
      </nav>
      <div style={mobileMenuWrapper} open={isOpen}>
        <ul open={isOpen} style={mobileMenuWrapper.listGroup}>
          <li style={mobileMenuWrapper.listItem}>
            <Link href='/biography'>
              <a>About me</a>
            </Link>
          </li>
          <li style={mobileMenuWrapper.listItem}>
            <Link href='/music-scores'>
              <a>Scores for sale</a>
            </Link>
          </li>
          <li style={mobileMenuWrapper.listItem}>
            <Link href='/shopping-cart'>
              <a>My Cart</a>
            </Link>
          </li>
          <li style={mobileMenuWrapper.listItem}>
            <Link href='/contact'>
              <a>Contact me</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
