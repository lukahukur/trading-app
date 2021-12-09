import './App.css';
import ReturnChart from './ReturnChart';
import LivePrice from './LivePrice';
import { useState } from 'react';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import BuySellForm from './components/buySellForm';



function App() {
  const [currency,getCurrency] = useState('bnbbtc');
  const [sell,isSelling] = useState(false);
  return (
    <div>
    <Header/>
    <div className='crt-wrppr'>
      <ReturnChart currency={currency}/>
      <LivePrice currency={currency}/>
      <div className='formJs'>
      <BuySellForm sell={sell} isSelling={isSelling} currency={currency}></BuySellForm>
      </div>
      </div>
    
      </div>
  );
}

export default App;
