import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/system';
import { createTheme, CssBaseline } from '@mui/material';
import { green, greenLight, greyDark, greyLight, red, white } from './constants/colors';

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: greyDark,
      paper: greyLight,
    },
    action: {
      disabledBackground: greenLight,
      disabled: greyLight,
    },
    primary: {
      main: green,
    },
    secondary: {
      main: greenLight,
    },
    error: {
      main: red,
    },
    text: {
      primary: white,
      secondary: greyLight,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: greyLight,
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
