import { useContext, useState } from 'react';
import getStripe from '../lib/get-stripe';
import Context from '../store/context';
import Button from '@mui/material/Button';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const ShoppingCart = () => {
  const { state, actions } = useContext(Context);
  const itemList = state.cartContents;
  const [redirecting, setRedirecting] = useState(false);
  const total = Number(state.total / 100).toFixed(2);

  const redirectToCheckout = async () => {
    const {
      data: { id },
    } = await axios.post('/api/checkout_sessions/', {
      items: itemList?.map((item) => ({
        price: item.id,
        quantity: 1,
      })),
    });

    // Redirect to checkout
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Cart</h2>
      {itemList.length > 0 ? (
        <>
          <div className={styles.cartListContainer}>
            <div className={styles.cartListItem}>
              <div className={styles.cartListItemHeading}>Name</div>
              <div className={styles.cartListItemHeading}>Cost</div>
            </div>
            {itemList?.map((item) => (
              <div key={item.id} className={styles.cartListItem}>
                <div>
                  {item.product.name} (<i>{item.product.description}</i>)
                </div>
                <div>${Number(item.unit_amount / 100).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className={styles.cartListContainer}>
            <div className={styles.cartListItem}>
              <div className={styles.cartListItemTotal}>Total</div>
              <div className={styles.cartListItemTotal}>${total}</div>
            </div>
          </div>
          <div style={{ margin: '2em 0' }}>
            <Button onClick={redirectToCheckout}>Proceed to Checkout</Button>
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default ShoppingCart;
