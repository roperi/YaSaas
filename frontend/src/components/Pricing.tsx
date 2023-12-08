import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';

interface PricingProps {
  title: string;
  price: number;
  currency: string;
  features: { name: string }[];
}

const Pricing = (): JSX.Element => {
  const theme = useTheme();

  const [pricing, setPricing] = useState<PricingProps[]>([]);

  const fetchPricing = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const endpoint = 'pricing';
    axios
      .get<PricingProps[]>(`${baseUrl}${endpoint}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setPricing(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleButtonClick = () => {
    const signupUrl = process.env.REACT_APP_SIGNUP_URL;

    if (signupUrl) {
      window.location.href = signupUrl;
    } else {
      console.error('Signup URL is undefined.');
    }
  };

  return (
    <div id='pricing'>
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
            Pricing
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            marginTop={theme.spacing(1)}
            gutterBottom
            color={theme.palette.text.secondary}
          >
            We offer a range of pricing plans to suit everyone
          </Typography>
        </Box>
        <Container>
          <Grid container spacing={4}>
            {pricing.map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box
                  component={Card}
                  height={1}
                  display='flex'
                  flexDirection='column'
                  boxShadow={0}
                  border={`1px solid ${theme.palette.divider}`}
                >
                  <CardContent
                    sx={{
                      padding: { sm: 4 },
                    }}
                  >
                    <Box
                      marginBottom={4}
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                    >
                      <Typography variant='h6' gutterBottom>
                        <Box component='span' fontWeight={600}>
                          {item.title}
                        </Box>
                      </Typography>
                      <Box display='flex' alignItems='flex-start'>
                        <Typography variant='h4' color='primary'>
                          <Box
                            component='span'
                            fontWeight={600}
                            marginRight={1 / 2}
                            sx={{
                              color:
                                theme.palette.mode === 'dark'
                                  ? theme.palette.primary.main
                                  : theme.palette.success.dark,
                            }}
                          >
                            {item.currency}
                          </Box>
                        </Typography>
                        <Typography variant='h2' color='primary' gutterBottom>
                          <Box
                            component='span'
                            fontWeight={600}
                            sx={{
                              color:
                                theme.palette.mode === 'dark'
                                  ? theme.palette.primary.main
                                  : theme.palette.success.dark,
                            }}
                          >
                            {item.price}
                          </Box>
                        </Typography>
                      </Box>
                      <Typography
                        variant='subtitle2'
                        color={theme.palette.text.secondary}
                      >
                        Per user, per month
                      </Typography>
                    </Box>
                    <Grid container spacing={1}>
                      {item.features?.map((feature, j) => (
                        <Grid item xs={12} key={j}>
                          <Typography
                            component='p'
                            align='center'
                            sx={{
                              textDecoration: 'none',
                            }}
                          >
                            {feature.name}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                  <Box flexGrow={1} />
                  <CardActions sx={{ justifyContent: 'center', padding: 4 }}>
                    <Button
                      size='large'
                      variant='contained'
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        textTransform: 'uppercase',
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.common.black
                            : theme.palette.common.white,
                        bgcolor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.primary.main
                            : theme.palette.success.dark,
                        border: '2px solid',
                        borderColor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.primary.main
                            : theme.palette.success.dark,
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color:
                            theme.palette.mode === 'dark'
                              ? theme.palette.primary.main
                              : theme.palette.success.dark,
                          border: '2px solid',
                          borderColor:
                            theme.palette.mode === 'dark'
                              ? theme.palette.primary.main
                              : theme.palette.success.dark,
                        },
                      }}
                      onClick={handleButtonClick}
                    >
                      Get started
                    </Button>
                  </CardActions>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Pricing;
