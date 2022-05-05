import React from 'react'

const WalletButton = ({title, handleClick}) => {

  return (
    <button onClick={handleClick} className='cta-button connect-wallet-button'>
      {title}
    </button>
  )
}

export default WalletButton
