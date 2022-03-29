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
          coin:'btc',
          fixed:2
        },
        {
          market:'shibusdt',
          name:'SHIB/USDT',
          coin:'shib',
          fixed:7
        },
        {
          market:'ethusdt',
          name:'ETH/USDT',
          coin:'eth',
          fixed:2
        },
        {
          market:'dogeusdt',
          name:'DOGE/USDT',
          coin:'doge',
          fixed:4
        },
        {
          market:'bnbusdt',
          name:'BNB/USDT',
          coin:'bnb',
          fixed:2
        },
        {
          market:'uniusdt',
          name:'UNI/USDT',
          coin:'uni',
          fixed:3
        },
        {
          market:'trxusdt',
          name:'TRX/USDT',
          coin:'trx',
          fixed:6
        },
        {
          market:'xrpusdt',
          name:'XRP/BTC',
          coin:'xrp',
          fixed:5
        },
        {
          market:'solusdt',
          name:'SOL/USDT',
          coin:'sol',
          fixed:3
        },
        {
          market:'maticusdt',
          name:'MATIC/USDT',
          coin:'magic',
          fixed:4
        }

  ]



  const [priceVal,setPriceVal] = useState();
  const [getTrades,setTrades] = useState({});
  const [orders,setOrderBook] = useState([]);
  const [history,setHistoryOfTrades] = useState([]);
 
    return(
       <span>
         
            

            
          
<react.Fragment>
          
  <Header wallet={wallet}/>
    <div className='crt-wrppr'>

      <ReturnChart currency={currency} coinsOBJ={coinsOBJ}  getTrades={getTrades} fixed={fixed} str={str}/>
      <OrderBook currency={currency} setOrder={(e)=>{setOrderBook(e)}} getTrades={getTrades} fixed={fixed} setPriceVal={(e)=>{setPriceVal(e)}}/>
     
       <div className='formJs'>
        <BuySellForm history={history} setHistory={(e)=>{setHistoryOfTrades(e)}} orders={orders}  coinsOBJ={coinsOBJ} priceVal={priceVal} currency={currency} fixed={fixed} isDone={isDone} str={str} wallet={wallet} setWallet={setWallet} cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet} getTrades={getTrades}></BuySellForm>
      </div>
          
    </div>

      <div className='grid_lvl_2'>
    <History history={history} setHistory={(e)=>{setHistoryOfTrades(e)}}/>
    <LivePrice setPriceVal={(e)=>{setPriceVal(e)}} currency={currency} tr={(e)=>{setTrades(e)}} fixed={fixed} setCondition={(e)=>{setCondition(e)}} />
      </div>
      </react.Fragment>

  </span>
          
    );
}
export default  Wrapper; 