import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from '../styles/Home.module.css';

const ProductCard = ({ data, handleOpen }) => {
  const { id, product, unit_amount } = data;
  const { name, description, metadata, images } = product;

  function onClickSample() {
    handleOpen(images[0]);
  }

  function convertPrice(price) {
    // Convert cents into dollars and cents
    return Number(price / 100, 2);
  }

  const convertedPrice = convertPrice(unit_amount);

  return (
    <Card
      sx={{ display: 'flex', justifyContent: 'space-between' }}
      className={styles.card}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}
      >
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          {/* <Typography color='text.secondary'>
            {metadata.category}
          </Typography> */}
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <Typography color='text.secondary'>${convertedPrice}</Typography>
        </CardContent>
        <CardActions>
          <Button size='large' onClick={onClickSample}>
            View Sample
          </Button>
          <Button size='large'>Add to Cart</Button>
        </CardActions>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {images.length > 0 && (
          <CardMedia
            component='img'
            sx={{ width: 300 }}
            image={images[0]}
            alt={product.name}
          />
        )}
      </Box>
    </Card>
  );
};

export default ProductCard;
