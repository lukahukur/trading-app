import './App.css';
import ReturnChart from './ReturnChart';
import LivePrice from './LivePrice';
import { useEffect, useState } from 'react';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import BuySellForm from './components/buySellForm';



function App() {

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


  const [currency,getCurrency] = useState('btcusdt');
  const [sell,isSelling] = useState(false);
  function setCurrency(e){
      getCurrency(e);
  }
 

  return (
    <div>
    <Header/>
    <div className='crt-wrppr'>
      <ReturnChart currency={currency} coinsOBJ={coinsOBJ} setCurrency={setCurrency} />
      <LivePrice currency={currency}/>
      <div className='formJs'>
      <BuySellForm sell={sell} isSelling={isSelling} currency={currency}></BuySellForm>
      </div>
      </div>
    
      </div>
  );
}

export default App;
