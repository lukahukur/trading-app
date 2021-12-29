import './App.css';
import {useState,useEffect } from 'react';
import react from 'react';
import Wrapper from './Wrapper';
import {Routes,Route,Link} from 'react-router-dom'

function App() {



  return (
<react.Fragment>
  <Routes>
   <Route index path='/' element={<Wrapper currency={'btcusdt'}  fixed={2} />}/> 
   <Route index path='/shibusdt' element={<Wrapper currency={'shibusdt'} fixed={7}/>}/> 
   <Route index path='/ethusdt' element={<Wrapper  currency={'ethusdt'} fixed={2} /> }/> 
   <Route index path='/dogeusdt' element={<Wrapper  currency={'dogeusdt'} fixed={5}/>}/> 
   <Route index path='/bnbusdt' element={<Wrapper  currency={'bnbusdt'} fixed={2}/>}/> 
   <Route index path='/uniusdt' element={<Wrapper  currency={'uniusdt'} fixed={3}/>}/> 
   <Route index path='/trxusdt' element={<Wrapper  currency={'trxusdt'} fixed={6}/>}/> 
   <Route index path='/xrpusdt' element={<Wrapper  currency={'xrpusdt'} fixed={5}/>}/> 
   <Route index path='/solusdt' element={<Wrapper currency={'solusdt'}  fixed={2}/>}/> 
   <Route index path='/maticusdt' element={<Wrapper  currency={'maticusdt'}fixed={3}/>}/> 
  </Routes>
</react.Fragment>

  );
}

export default App;
