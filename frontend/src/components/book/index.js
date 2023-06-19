import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import useBookStoreData from '../../hooks/useBookStoreData';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
// import Box from '@mui/material/Box';



function Book({ filterBy }) {

  const [bookList, setBookList] = React.useState([])
  const { increaseCartItem, decreaseCartItem, removeFromCart, getItemQuantity } = useBookStoreData();

  React.useEffect(() => {
    getBookList();
  }, [])

  const getBookList = () => {
    fetch('http://localhost:3001/books')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setBookList(data)
      });
  }

  const card = (book) => {
    return <React.Fragment>
      <CardMedia
        sx={{ height: 500 }}
        image={book.image}
        title={book.title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Author : {book.author}
        </Typography>
        <Typography variant="body2">
          Rating : {book.rating}
        </Typography>
        <Typography variant="body2">
          Price: {`$${book.price}`}
        </Typography>
      </CardContent>
      <CardActions>
        {getItemQuantity(book._id) === 0
          ? <Button onClick={() => increaseCartItem(book._id)} variant="contained" size="small" style={{ width: '100%' }}>
            <span><AddShoppingCartIcon /></span>Add To Cart</Button>
          :
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button onClick={() => increaseCartItem(book._id)} variant="contained" size="small" > + </Button>
              <h4>{getItemQuantity(book._id)}</h4>
              <Button onClick={() => decreaseCartItem(book._id)} variant="contained" size="small" > - </Button>
            </div>
            <Button onClick={() => removeFromCart(book._id)} variant="outlined" size="small" color='error' startIcon={<DeleteIcon />} >Remove</Button>
          </div>
        }
      </CardActions>
    </React.Fragment>
  };


  return (
    <Grid container sx={{ p: 2.5 }} spacing={2}>
      {bookList?.map(book =>
        <Grid key={book._id} item xs={3}>
          <Card variant="outlined">{card(book)}</Card>
        </Grid>
      )}
    </Grid>
  );
}

export default Book;