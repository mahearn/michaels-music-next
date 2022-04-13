import React, { useState, useContext } from 'react';
import Stripe from 'stripe';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Modal from '@mui/material/Modal';
import Context from '../store/context';
import ProductCard from '../components/product-card';

import styles from '../styles/Home.module.css';

const MusicScores = (props) => {
  const items = props.products;
  const { actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [sortedItems, setSortedItems] = useState(items);

  const handleClose = () => setShowModal(false);

  const handleOpen = (image) => {
    setShowModal(true);
    setCurrentImage(image);
  };

  function addToCart(items) {
    const { id, product, unit_amount } = items;
    actions({ type: 'ADD', payload: { id, product, unit_amount } });
  }

  function getCartFromLocalStorage() {
    const cart = actions({
      type: 'RESTORE_CART_FROM_STORAGE',
      payload: null,
    });
  }

  function sortByCategory(items) {
    let sortedItems = []
      .concat(items)
      .sort((a, b) =>
        a?.product.metadata.category > b?.product.metadata.category ? 1 : -1
      );
    setSortedItems(sortedItems);
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Scores for Sale</h2>
      {/* <Button onClick={sortByCategory} className={styles.sortButton}>
          Sort by category
        </Button> */}
      <div className={styles.grid}>
        {sortedItems.length === 0 && 'Loading...'}
        {sortedItems?.map((item) => (
          <ProductCard
            data={item}
            handleOpen={handleOpen}
            addToCart={addToCart}
            key={item.id}
          />
        ))}
      </div>

      <Modal open={showModal} onClose={handleClose} contentLabel='Sample score'>
        <Box sx={modalStyle} style={{ height: '90vh', width: '40vw' }}>
          <Image
            loader={() => currentImage}
            src={currentImage}
            alt='sample score'
            layout='fill'
            objectFit='contain'
          />
        </Box>
      </Modal>
    </div>
  );
};

export default MusicScores;

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2020-08-27',
  });

  const productsWithPrices = await stripe.prices.list({
    expand: ['data.product'], // 🎉 Give me the product data too
  });
  const products = productsWithPrices.data;

  return {
    props: {
      products,
    },
  };
};
