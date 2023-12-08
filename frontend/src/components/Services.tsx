import { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface ServicesProps {
  title: string;
  description: string;
  icon: string;
}

const Services = (): JSX.Element => {
  const theme = useTheme();

  const [services, setServices] = useState<ServicesProps[]>([]);

  const fetchServices = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const endpoint = 'services';

    axios
      .get<ServicesProps[]>(`${baseUrl}${endpoint}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div id='services'>
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
            Services
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            marginTop={theme.spacing(1)}
            gutterBottom
            color={theme.palette.text.secondary}
          >
            We offer great technology solutions for all your data needs.
          </Typography>
        </Box>
        <Container>
          <Grid container spacing={4}>
            {services.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box component={Card} padding={4} width={1} height={1}>
                  <Box display='flex' flexDirection='column'>
                    <Box
                      component={Avatar}
                      width={50}
                      height={50}
                      marginBottom={2}
                      bgcolor={
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary.main
                          : theme.palette.success.dark
                      }
                      color={theme.palette.background.paper}
                    >
                      <Icon className='material-icons-outlined'>
                        {item.icon}
                      </Icon>
                    </Box>
                    <Typography
                      variant='h6'
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography color={theme.palette.text.secondary}>
                      {item.description}
                    </Typography>
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

export default Services;
