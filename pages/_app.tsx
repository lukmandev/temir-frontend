import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {Provider as StoreProvider} from "react-redux";

import '../utility/modules';
import createEmotionCache from '../utility/createEmotionCache';
import {theme} from "../utility/theme";
import {setupStore} from "../store/reducer";
import '../assets/styles/index.css';


interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const store = setupStore();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
          <StoreProvider store={store}>
              <CssBaseline />
              <Component {...pageProps} />
          </StoreProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
