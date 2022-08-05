import React from "react";
import {useSelector} from 'react-redux'
export default function TransactionForm(){
    const red = '#F6465D';
    const green = '#1AB41A';
    const gray = '#2B3139';
    const side = useSelector(state => state.symbol.symbol)

    const [buyer,setSide] = React.useState(true);

    const buy = React.useRef();
    const sell = React.useRef();

    function hndl(side){
        setSide(side)
    }

    React.useEffect(()=>{
      if(buyer === true){
        buy.current.style.background = green;
        buy.current.style.color = 'black';
        sell.current.style.background = gray
        sell.current.style.color = 'gray'
      }
     else{
        sell.current.style.background = red;
        sell.current.style.color = 'black';
        buy.current.style.background = gray
        buy.current.style.color = 'gray'
     }
    },[buyer])
    
    return(
    <div className="form">

            <span className="btn_w">
                    <button ref={buy} className=" btn left" onClick={()=>{hndl(true)}}>BUY</button>
                    <button ref={sell}className=" btn right" onClick={()=>{hndl(false)}}>SELL</button>              
            </span>

            <span style={{width:'280px'}}>
            <span style={{display:'flex',width:'180px',justifyContent:'space-between'}}>
                <button className="txt" style={{color:'rgb(44, 235, 227)'}}>Limit</button>
                <button className="txt">Market</button>
                <button className="txt">Stop Limit</button>
            </span>
            </span>
            <span className="avbl">
                <span style={{fontSize:'14px',color:'rgb(183, 189, 198)'}}>Avbl:</span>
                <span style={{fontSize:'14px',color:'#9E058A'}}>10000000 USDT</span>
            </span>

            <span className="inp_w">
                <span className='flex cntr i_wrp'>
                <p  style={{color:'rgb(183, 189, 198)',fontSize:'14px'}} >Price</p>
                <input type="number" min={0} className="gr inpII" style={{width:'194px'}}/>
                <p style={{fontSize:'14px'}}>USDT</p>
                </span>

                <span className='flex cntr i_wrp'>
                <p style={{color:'rgb(183, 189, 198)',fontSize:'14px'}}>Amount</p>
                <input type="number"  min={0} className="gr inpII" />
                <p style={{fontSize:'14px'}}>{  side.slice(0,side.length >7 ? 4:3).toUpperCase()}</p>
                </span>
                <input type="range"  id='range'className="gr "/>

                <span className='flex cntr i_wrp'>
                <p  style={{color:'rgb(183, 189, 198)',fontSize:'14px'}} >Total</p>
                <input type="number" min={0} className="gr inpII" style={{width:'230px'}}/>
              
                </span>
                <button  className='btn left right gr' style={{width:'280px',backgroundColor:buyer === true?green:red,color:'black'}}>{
                    buyer?'Buy':'Sell'
                }
                </button>
            </span>

    </div>
)
   
    
}