import React from "react";
import Wrapper from "./wrapper";
import {Header} from './header';
import '../css/app.css'
import { Routes,Route,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

function App(){

  const coins = useSelector(state => state.symbol.coins) 

    return (
     <div id="app">
      <Header/>
    
    <Routes>
      <Route path='/' element={<Navigate to="/btcusdt" replace={true}/>}/>
      <Route path='*' element={<Navigate to="/btcusdt" replace={true}/>}/>
        {coins.map((e)=>{
          return   <Route key={e.id} path={`/${e.coin}usdt`} element={<Wrapper currency={e.coin + 'usdt'}/>}/>
        })}
    
     </Routes>
     </div>
    )
  
}
export default App



