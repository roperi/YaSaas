import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

interface Props {
  [x: string]: any;
}

const Spacer = ({ sx = [] }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={[
        {
          backgroundColor: theme.palette.background.default,
        },
        ...[sx],
      ]}
    ></Box>
  );
};

export default Spacer;
