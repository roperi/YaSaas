import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface ProductsProps {
  name: number;
  description: string;
  image: string;
}

const Products = (): JSX.Element => {
  const theme = useTheme();

  const [products, setProducts] = useState<ProductsProps[]>([]);

  const fetchProducts = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const endpoint = 'products';

    axios
      .get<ProductsProps[]>(`${baseUrl}${endpoint}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div id='products'>
      <Box
        sx={{
          pt: 5,
          pb: 10,
          px: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box marginBottom={4}>
          <Typography
            variant='h5'
            align='center'
            fontWeight={700}
            marginTop={theme.spacing(1)}
            gutterBottom
            sx={{
              color: theme.palette.text.primary,
              textTransform: 'uppercase',
            }}
          >
            Products
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            marginTop={theme.spacing(1)}
            gutterBottom
            color={theme.palette.text.secondary}
          >
             Experience our wide range of data products.
          </Typography>
        </Box>
        <Container>
          <Grid container spacing={4}>
            {products.map((item, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Box
                  component={Card}
                  padding={4}
                  width={1}
                  height={1}
                  bgcolor={theme.palette.background.paper}
                  sx={{
                    '&:hover': {
                      bgcolor: theme.palette.background.default,
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.common.white
                          : theme.palette.common.black,
                    },
                  }}
                >
                  <Box display='flex' flexDirection='column'>
                    <Typography
                      variant='h6'
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography color='inherit'>{item.description}</Typography>
                  </Box>
                  <Box display='block' width={1} height={1}>
                    <Card
                      sx={{
                        width: 1,
                        height: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 'none',
                        bgcolor: 'transparent',
                        backgroundImage: 'none',
                      }}
                    >
                      <CardMedia
                        title=''
                        image={item.image}
                        sx={{
                          position: 'relative',
                          height: 320,
                          overflow: 'hidden',
                          borderRadius: 2,
                          filter:
                            theme.palette.mode === 'dark'
                              ? 'brightness(0.7)'
                              : 'brightness(0.9)',
                          mt: 4,
                        }}
                      ></CardMedia>
                    </Card>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Products;
