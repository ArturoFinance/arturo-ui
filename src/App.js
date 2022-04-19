import ConnectWalletButton from "./components/ConnectWalletButton"
import './App.css';

function App() {
  return (
    <div className='main-app'>
      <h1>Welcome to Arturo Finance!</h1>
      <div>
        {ConnectWalletButton()}
      </div>
    </div>
  );
}

export default App;
