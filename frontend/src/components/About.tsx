import { useState, useEffect } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface AboutProps {
  value: number;
  suffix: string;
  description: string;
}

const About = (): JSX.Element => {
  const theme = useTheme();
  const [viewPortEntered, setViewPortEntered] = useState(false);
  const setViewPortVisibility = (
    isVisible: boolean | ((prevState: boolean) => boolean)
  ) => {
    if (viewPortEntered) {
      return;
    }
    setViewPortEntered(isVisible);
  };

  const [about, setAbout] = useState<AboutProps[]>([]);

  const fetchAbout = () => {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const endpoint = 'about';

    axios
      .get<AboutProps[]>(`${baseUrl}${endpoint}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setAbout(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <div id='about'>
      <Box
        sx={{
          pt: 5,
          pb: 12,
          px: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box marginBottom={4}>
          <Typography
            variant='h5'
            align='center'
            color={theme.palette.text.primary}
            fontWeight={700}
            marginTop={theme.spacing(1)}
            gutterBottom
            sx={{
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            About
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            color={theme.palette.text.secondary}
            marginTop={theme.spacing(1)}
            gutterBottom
          >
            We turn data into insights, fueling informed decisions for your success.
          </Typography>
        </Box>
        <Container>
          <Grid container spacing={4}>
            {about.map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box
                  component={Card}
                  height={1}
                  display='flex'
                  flexDirection='column'
                  boxShadow={0}
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
                      <Typography variant='h4' color='primary' gutterBottom>
                        <Box
                          fontWeight={600}
                          sx={{
                            color:
                              theme.palette.mode === 'dark'
                                ? theme.palette.primary.main
                                : theme.palette.success.dark,
                          }}
                        >
                          <VisibilitySensor
                            onChange={(
                              isVisible:
                                | boolean
                                | ((prevState: boolean) => boolean)
                            ) => setViewPortVisibility(isVisible)}
                            delayedCall
                          >
                            <CountUp
                              duration={2}
                              end={viewPortEntered ? item.value : 0}
                              start={0}
                              suffix={item.suffix}
                            />
                          </VisibilitySensor>
                        </Box>
                      </Typography>
                      <Typography
                        component='p'
                        color={theme.palette.text.secondary}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default About;
