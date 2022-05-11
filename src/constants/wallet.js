import MetamaskIcon from '../assets/images/metamask.png';
// import AVMEIcon from '../assets/images/avme.png'
// import WalletConnectIcon from '../assets/images/walletConnectIcon.svg'
// import { injected, walletconnect } from '../connectors';
import { injected } from '../connectors';

export const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconURL: MetamaskIcon,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  // WALLET_CONNECT: {
  //   connector: walletconnect,
  //   name: 'WalletConnect',
  //   iconURL: WalletConnectIcon,
  //   description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  //   href: null,
  //   color: '#4196FC',
  //   mobile: true
  // },
  // AVME: {
  //   connector: injected,
  //   name: 'AVME',
  //   iconURL: AVMEIcon,
  //   description: 'Injected web3 provider.',
  //   href: null,
  //   color: '#010101',
  //   primary: true
  // },
};