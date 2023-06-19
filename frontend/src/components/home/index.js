import { Container, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import Book from '../book';
import ShoppingCartIcon from '../cart';
import { useState, useEffect } from 'react';

function Home() {

  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    console.log("Rendered");
  })

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '25ch',
        },
      },
    },
  }));

  const brandIcon = (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  );

  const brandName = (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
    >
      Book Store
    </Typography>
  );

  const filterInput = (
    <Search>
      <SearchIconWrapper>
        <FilterAltOutlined />
      </SearchIconWrapper>
      <StyledInputBase
        value={filterBy}
        placeholder="By Title/Author/Rating"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );

  const appBar = (
    <AppBar position="static">
      <Toolbar>
        {brandIcon}
        {brandName}
        {filterInput}
        <ShoppingCartIcon/>
      </Toolbar>
    </AppBar>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
        {appBar}
        <Book />
      </Box>
    </Container>
  );
}

export default Home;
