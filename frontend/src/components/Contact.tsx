import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

const Contact = (): JSX.Element => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const endpoint = 'contact';
      const response = await fetch(`${baseUrl}${endpoint}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Message sent!');
      } else {
        alert('Error: Message could not be sent');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id='contact'>
      <Box
        sx={{
          pt: 5,
          pb: 10,
          px: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12}>
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
                Contact us
              </Typography>
              <Typography
                variant='subtitle1'
                align='center'
                color={theme.palette.text.secondary}
                marginTop={theme.spacing(1)}
                gutterBottom
              >
                We are happy to hear from you.
          </Typography>


            </Grid>
            <Grid item xs={12} md={6} margin='auto'>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  fullWidth
                  label='Name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  margin='normal'
                />
                <TextField
                  required
                  fullWidth
                  label='Email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  margin='normal'
                />
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label='Message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  margin='normal'
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={{ marginTop: theme.spacing(2) }}
                >
                  Send message
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Contact;
