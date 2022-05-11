import React from 'react'
import LiquidityForm from '../../LiquidityForm';
import TokenSwap from '../../TokenSwap';
import '../Home/Home.css'

const Exchange = () => {
  return (
    <div className='home'>
      <LiquidityForm />
      <TokenSwap />
    </div>
  )
}

export default Exchange
