import { createMuiTheme, colors } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      // default: '#F4F6F8',
      default: '#FFFFFF',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#24AD65'
    },
    text: {
      primary: '#172b4d',
      secondary: '#000000',
    }
  },
  shadows,
  typography
});

export default theme;
