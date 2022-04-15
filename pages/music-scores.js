import React, { useState, useEffect, useContext } from 'react';
import Stripe from 'stripe';
import Box from '@mui/material/Box';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Context from '../store/context';
import ProductCard from '../components/product-card';

import styles from '../styles/Home.module.css';
import { ConstructionOutlined } from '@mui/icons-material';

const MusicScores = (props) => {
  const products = props.products;
  const { actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [items, setItems] = useState(products);

  const handleClose = () => setShowModal(false);

  const handleOpen = (image) => {
    setShowModal(true);
    setCurrentImage(image);
  };

  function addToCart(items) {
    const { id, product, unit_amount } = items;
    actions({ type: 'ADD', payload: { id, product, unit_amount } });
  }

  function handleFilterChange(event) {
    setSelectedCategory(event.target.value);
  }

  function sortByCategory(items) {
    let sortedItems = []
      .concat(items)
      .sort((a, b) =>
        a?.product.metadata.category > b?.product.metadata.category ? 1 : -1
      );
    setSortedItems(sortedItems);
  }

  useEffect(() => {
    function filterByCategory() {
      if (selectedCategory === '') {
        return products;
      } else {
        const filteredProducts = products?.filter(
          (item) => item.product.metadata.category === selectedCategory
        );
        return filteredProducts;
      }
    }

    const filteredData = filterByCategory();

    setItems(filteredData);
  }, [selectedCategory, products]);

  console.log(products);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
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
      <form className={styles.filterTool}>
        <FormControl>
          <InputLabel htmlFor='category'>Filter by: </InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleFilterChange}
            className={styles.selectFilterComponent}
          >
            <MenuItem value=''>None</MenuItem>
            <MenuItem value='Solo classical guitar'>
              Solo classical guitar
            </MenuItem>
            <MenuItem value='Solo acoustic guitar'>
              Solo acoustic guitar
            </MenuItem>
            <MenuItem value='Solo instrumental'>Solo instrumental</MenuItem>
            <MenuItem value='Chamber ensemble'>Chamber ensemble</MenuItem>
          </Select>
        </FormControl>
      </form>
      <div className={styles.grid}>
        {items.length === 0 && 'Loading...'}
        {items?.map((item) => (
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

MusicScores.propTypes = {
  props: PropTypes.object,
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
