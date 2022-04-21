import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ConnectWalletButton from "./components/ConnectWalletButton"
import TokenPriceTable from './components/TokenPriceTable';
import './App.css';

function App() {
  const [ showPrice, setShowPrice ] = useState(false)

  return (
    <div className='main-app'>
      <h1>Welcome to Arturo Finance!</h1>
      <ConnectWalletButton/>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => setShowPrice(true)}>Show Prices</Button>
      </Stack>
      {
        showPrice && 
          <TokenPriceTable/>
      } 
    </div>
  );
}

export default App;
