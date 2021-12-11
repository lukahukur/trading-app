import './App.css';
import ReturnChart from './ReturnChart';
import LivePrice from './LivePrice';
import { useState } from 'react';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import BuySellForm from './components/buySellForm';



function App() {

  const coinsOBJ = [ 
        {
          market:'btcusdt',
          name:'BTC/USDT',
          coin:'BTC'
        },
        {
          market:'shibusdt',
          name:'SHIB/USDT',
          coin:'SHIB'
        },
        {
          market:'ethusdt',
          name:'ETH/USDT',
          coin:'ETH'
        },
        {
          market:'dogeusdt',
          name:'DOGE/USDT',
          coin:'DOGE'
        },
        {
          market:'bnbusdt',
          name:'BNB/USDT',
          coin:'BNB'
        },
        {
          market:'uniusdt',
          name:'UNI/USDT',
          coin:'UNI'
        },
        {
          market:'trxusdt',
          name:'TRX/USDT',
          coin:'TRX'
        },
        {
          market:'xrpusdt',
          name:'XRP/BTC',
          coin:'XRP'
        },
        {
          market:'solusdt',
          name:'SOL/USDT',
          coin:'SOL'
        },
        {
          market:'maticusdt',
          name:'MATIC/USDT',
          coin:'MAGIC'
        }

  ]

  
  const [currency,getCurrency] = useState('btcusdt');
  const [sell,isSelling] = useState(false);
  
  return (
    <div>
    <Header/>
    <div className='crt-wrppr'>
      <ReturnChart currency={currency} coinsOBJ={coinsOBJ}/>
      <LivePrice currency={currency}/>
      <div className='formJs'>
      <BuySellForm sell={sell} isSelling={isSelling} currency={currency}></BuySellForm>
      </div>
      </div>
    
      </div>
  );
}

export default App;
