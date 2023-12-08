import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

interface Props {
  href: string;
  text: string;
}

const CustomButton = ({ href, text }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Button
      component='a'
      color='primary'
      href={href}
      variant='text'
      sx={{
        color: theme.palette.text.primary,
        textTransform: 'uppercase',
        mx: 1.5,
        marginLeft: '15px',
        '&:active': {
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.main
              : theme.palette.success.dark,
        },
        '&:hover': {
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.main
              : theme.palette.success.dark,
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
