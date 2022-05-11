import React from 'react';
import ReactDOM from 'react-dom';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { MoralisProvider } from 'react-moralis';
import { ThemeProvider } from '@mui/material/styles';

import reportWebVitals from './reportWebVitals';
import { getLibrary } from './utils/web3React';
import Themes from './themes'
import App from './App';

import './index.css';

const moralisServerURL = "https://1wwchnmfj603.usemoralis.com:2053/server"
const moralisAppId = "BTpW8iSezgXMG41nxYMB4QVNw0QSSClIFRpbpRRh"
const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK');

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ThemeProvider theme={Themes.default}>
          <MoralisProvider appId={moralisAppId} serverUrl={moralisServerURL}>
            <App />
          </MoralisProvider>
        </ThemeProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
