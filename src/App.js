import './App.css';
import {useState,useEffect } from 'react';
import react from 'react';
import Wrapper from './Wrapper';
import {Routes,Route,Link} from 'react-router-dom'

function App() {
    const [wallet,setWallet] = useState(1000000);
    const [cryptoWallet,setCryptoWallet] = useState({
      shib:0,
      btc:0,
      doge:0,
      bnb:0,
      uni:0,
      trx:0,
      xrp:0,
      sol:0,
      matic:0
    });


  return (
<react.Fragment>
  <Routes>
   <Route index path='/' element={<Wrapper currency={'btcusdt'}  fixed={2} str={3}      wallet={wallet}  setWallet={setWallet}  cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet} />}/> 
   <Route index path='/shibusdt' element={<Wrapper currency={'shibusdt'} fixed={7} str={4}      wallet={wallet}   setWallet={setWallet}  cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet}   />}/> 
   <Route index path='/ethusdt' element={<Wrapper  currency={'ethusdt'} fixed={2} str={3}     wallet={wallet}    setWallet={setWallet}   cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet}  /> }/> 
   <Route index path='/dogeusdt' element={<Wrapper  currency={'dogeusdt'} fixed={5} str={4}    wallet={wallet}   setWallet={setWallet}    cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet}  />}/> 
   <Route index path='/bnbusdt' element={<Wrapper  currency={'bnbusdt'} fixed={2} str={3}   wallet={wallet}    setWallet={setWallet}  cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet} />}/> 
   <Route index path='/uniusdt' element={<Wrapper  currency={'uniusdt'} fixed={3} str={3}  wallet={wallet}    setWallet={setWallet}  cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet} />}/> 
   <Route index path='/trxusdt' element={<Wrapper  currency={'trxusdt'} fixed={6} str={3}  wallet={wallet}    setWallet={setWallet}  cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet} />}/> 
   <Route index path='/xrpusdt' element={<Wrapper  currency={'xrpusdt'} fixed={5} str={3}  wallet={wallet}     setWallet={setWallet} cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet}  />}/> 
   <Route index path='/solusdt' element={<Wrapper currency={'solusdt'}  fixed={2} str={3}   wallet={wallet}   setWallet={setWallet}  cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet} />}/> 
   <Route index path='/maticusdt' element={<Wrapper  currency={'maticusdt'}fixed={3} str={5}   wallet={wallet}    setWallet={setWallet} cryptoWallet={cryptoWallet} setCryptoWallet={setCryptoWallet} />}/> 
  </Routes>
</react.Fragment>

  );
}

export default App;
