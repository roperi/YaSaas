import { PaletteMode } from '@mui/material';
import { green, orange } from '@mui/material/colors';

export const light = {
  mode: 'light' as PaletteMode,
  primary: {
    main: 'rgb(129, 187, 89)',
    contrastText: 'rgb(100, 101, 98)',
  },
  success: {
    main: 'rgb(111, 214, 145)',
    light: 'rgb(131, 231, 168)',
    dark: green[600],
  },
  text: {
    primary: 'rgb(40, 40, 40)',
    secondary: 'rgb(103, 119, 136)',
  },
  background: {
    paper: 'rgb(242, 243, 245)',
    default: 'rgb(255, 255, 255)',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

export const dark = {
  mode: 'dark' as PaletteMode,
  primary: {
    main: 'rgb(129, 187, 89)',
    contrastText: 'rgb(100, 101, 98)',
  },
  warning: {
    main: 'rgb(242, 175, 87)',
    light: 'rgb(245, 205, 130)',
    dark: orange[600],
  },
  text: {
    primary: 'rgb(255, 255, 255)',
    secondary: 'rgb(207, 207, 207)',
  },
  background: {
    default: 'rgb(0, 0, 0)',
    paper: 'rgb(15, 15, 15)',
  },
  divider: 'rgba(145, 158, 171, 0.24)',
};
