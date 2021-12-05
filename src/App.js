import './App.css';
import ReturnChart from './ReturnChart';
import LivePrice from './LivePrice';
import { useState } from 'react';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import BuySellForm from './components/buySellForm';



function App() {
  const [currency,getCurrency] = useState('btcusdt');
  return (
    <div>
    <Header/>
    <div className='crt-wrppr'>
      <ReturnChart currency={currency}/>
      <LivePrice currency={currency}/>
      <div className='formJs'>
      <BuySellForm></BuySellForm>
      </div>
      </div>
      </div>
  );
}

export default App;
