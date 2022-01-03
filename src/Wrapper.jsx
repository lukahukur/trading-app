import react from "react";
import './App.css';
import ReturnChart from './ReturnChart';
import LivePrice from './LivePrice';
import {useState } from 'react';
import Header from './components/Header';
import BuySellForm from './components/buySellForm';
import History from './components/history';
import OrderBook from './components/OrderBook';
import { useEffect } from "react/cjs/react.development";
function Wrapper({currency,fixed,str,wallet,setWallet,cryptoWallet,setCryptoWallet}){
  const [isDone,condition] = useState(false);
function setCondition(e){
  condition(e);
}

    const coinsOBJ = [ 
        {
          market:'btcusdt',
          name:'BTC/USDT',
          coin:'BTC',
          fixed:2
        },
        {
          market:'shibusdt',
          name:'SHIB/USDT',
          coin:'SHIB',
          fixed:7
        },
        {
          market:'ethusdt',
          name:'ETH/USDT',
          coin:'ETH',
          fixed:2
        },
        {
          market:'dogeusdt',
          name:'DOGE/USDT',
          coin:'DOGE',
          fixed:4
        },
        {
          market:'bnbusdt',
          name:'BNB/USDT',
          coin:'BNB',
          fixed:2
        },
        {
          market:'uniusdt',
          name:'UNI/USDT',
          coin:'UNI',
          fixed:3
        },
        {
          market:'trxusdt',
          name:'TRX/USDT',
          coin:'TRX',
          fixed:6
        },
        {
          market:'xrpusdt',
          name:'XRP/BTC',
          coin:'XRP',
          fixed:5
        },
        {
          market:'solusdt',
          name:'SOL/USDT',
          coin:'SOL',
          fixed:3
        },
        {
          market:'maticusdt',
          name:'MATIC/USDT',
          coin:'MAGIC',
          fixed:4
        }

  ]



  const [priceVal,setPriceVal] = useState();
  const [getTrades,setTrades] = useState({});

    return(
       <span>
         
            

            
          
<react.Fragment>
          
  <Header wallet={wallet}/>
    <div className='crt-wrppr'>

      <ReturnChart currency={currency} coinsOBJ={coinsOBJ}  getTrades={getTrades} fixed={fixed} str={str}/>
      <OrderBook currency={currency} getTrades={getTrades} fixed={fixed} setPriceVal={(e)=>{setPriceVal(e)}}/>
     
       <div className='formJs'>
        <BuySellForm priceVal={priceVal} currency={currency} fixed={fixed} isDone={isDone} str={str} wallet={wallet} setWallet={setWallet} cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet} getTrades={getTrades}></BuySellForm>
      </div>
          
    </div>

      <div className='grid_lvl_2'>
    <History/>
    <LivePrice setPriceVal={(e)=>{setPriceVal(e)}} currency={currency} tr={(e)=>{setTrades(e)}} fixed={fixed} setCondition={(e)=>{setCondition(e)}} />
      </div>
      </react.Fragment>

  </span>
          
    );
}
export default Wrapper; 