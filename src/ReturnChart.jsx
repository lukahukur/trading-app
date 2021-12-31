import CreateChart from './Candles';
import React,{useState,useEffect,useRef} from "react";
import searchIcon from './../src/search.png';
import {Link} from 'react-router-dom';

const styles = {
    c_w:'wrapper_candles',
    b_w:'b_w',
    btnT:'btnT',
    noHover:'nh'
  }
  
//   let streams = [
//     "ethusdt@trade","bnbusdt@trade",
//     "xrpusdt@trade","shibusdt@trade",
//     "dogeusdt@trade","uniusdt@trade",
//     "trxusdt@trade","solusdt@trade",
//     "maticusdt@trade"
//   ];
const ReturnChart = ({currency,coinsOBJ,fixed,getTrades,str})=>{
  

    const [curr,setCurr]= useState([]);
    const [change24hr,set24rhchange] = useState([]);
    const m1 = useRef();
    const m5 = useRef();
    const w1= useRef();
    const M1 = useRef();
    const d_ref = useRef();
    const input_ref = useRef();
    const p_r = useRef();
    const li = useRef();
    const [is,setIfIs] = useState(false);

    const [arr_of_coins,setC] = useState([...coinsOBJ]) ;
   
    useEffect(()=>{
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currency}@ticker`);
        ws.onmessage = (e)=>{
            const parsedData = JSON.parse(e.data);
            
            set24rhchange(parsedData)
            setIfIs(true)
           
        }

        return () => ws.close()
    },[currency]);

   useEffect(()=>{
    
        
        setCurr(getTrades)

       
  
    
    
   },[currency,getTrades,is]);
 


  
//document.getElementsByClassName('tv-lightweight-charts')[0].remove();

function filterLinks(){
   for(let i = 0;i<li.current.childNodes.length;i++){
    if(li.current.childNodes[i].getAttribute('data').includes(input_ref.current.value.toLowerCase()) ){
        li.current.childNodes[i].classList.remove('displayNone')
    
}else{
    li.current.childNodes[i].classList.add('displayNone')
}




}
}
useEffect(()=>{
   input_ref.current.addEventListener('input',filterLinks)
},[]);


  useEffect(()=>{
       input_ref.current.addEventListener('input',(event)=>{
        let temp = [];
  
        coinsOBJ.filter((e)=>{
         
        
                if(e.market.includes(event.target.value.toLowerCase()) === true){
                    temp.unshift(e);
                    setC([...temp])
                    
                }
            
               
        })
        
      
   });
       
  },[currency]);

    




    const [getTime,setTime] = useState('1m');
    
useEffect(()=>{
   m1.current.onclick = ()=>{
       setTime('1m');
       
    
    }
    m5.current.onclick = ()=>{
        setTime('5m');
        
     }
     w1.current.onclick = ()=>{
        setTime('1w');
       
     }
     M1.current.onclick = ()=>{
        setTime('1M');
       
     }
 const arr_of_btns = [m1,m5,w1,M1];
 arr_of_btns.forEach((e,i,arr)=>{
   if(e.current.innerHTML === getTime){
       e.current.classList.add('addBlue');
   }
   else{
       e.current.classList.remove('addBlue');
   }

 });

},[getTime]);

    return(
        <div className={styles.c_w}>
            
                <div className ='search_w'>
                        
                       
                    <div className='s_w_II'>
                    <span className='cllls'>
                     <div className='searchBox'><img src={searchIcon} className='miniicon'/>
                        
                        <input type="text" id='Inp' ref={input_ref} autoComplete="off" placeholder={currency.toUpperCase()}/>


                        <div className='dropDown' ref={d_ref} >
                            
                            <ul className={'ul_search'} ref={li} >
                            <a href='/'data={'btcusdt'} >BTC<span className='gr'>/USDT</span></a>
                            <a href='/shibusdt' data={'shibusdt'}>SHIB<span className='gr'>/USDT</span></a>
                            <a href='/ethusdt'data={'ethusdt'}>ETH<span className='gr'>/USDT</span></a>
                            <a href='/dogeusdt'data={'dogeusdt'}>DOGE<span className='gr'>/USDT</span></a>
                            <a href='/bnbusdt'data={'bnbusdt'}>BNB<span className='gr'>/USDT</span></a>
                            <a href='/uniusdt'data={'uniusdt'}>UNI<span className='gr'>/USDT</span></a>
                            <a href='/trxusdt'data={'trxusdt'}>TRX<span className='gr'>/USDT</span></a>
                            <a href='/xrpusdt'data={'xrpusdt'}>XRP<span className='gr'>/USDT</span></a>
                            <a href='/solusdt'data={'solusdt'}>SOL<span className='gr'>/USDT</span></a>
                            <a href='/maticusdt'data={'maticusdt'}>MATIC<span className='gr'>/USDT</span></a>      
                            </ul>
                        
                           </div>  
                        
                      </div>
                     { is?  <div className='hr_24_crr' >
                        <span className='clm '>
                        <span>Price</span>
                            {
                           
                <span className='w' style={{color:'#9E058A'}} ref={p_r}>{parseFloat(curr.p).toFixed(fixed)}</span>
                                
                        }</span>
                            <span className='clm l'>
                            <span>24h High</span>
                            {
                               
                     <span className='w'>{parseFloat(change24hr.h).toFixed(fixed)}</span>
                                
                           
                            
                        }</span>

                        <span className='clm l'>
                            <span>24h Low</span>
                            {
                          
                               
                             <span className = 'w' >{parseFloat(change24hr.l).toFixed(fixed)}</span>
                                
                           
                            
                        }</span>
                         <span className='clm l'>
                             <span>24h volume <span style={{color:'#9E058A',textTransform: 'uppercase'}}>{currency.substring(0,str)}</span></span>
                             <span className='w'>{parseFloat(change24hr.v)}</span>
                           </span>
                          <span className='clm l'>
                            <span>24h change</span>
                            <span className='s_w2'>
                            {
                           
                                
                                   <span className='w' style={change24hr.p >= 0? {color:'#1AA517',marginRight:'7px'}:{color:'rgb(200 2 28)',marginRight:'7px'}}>{(parseFloat(change24hr.p))}</span>
                                

                            
                            }
                           
                            {
                           
                                   <span className='w' style={change24hr.p >= 0? {color:'#1AA517'}:{color:'rgb(200 2 28)'}}>{(parseFloat(change24hr.P).toFixed(2) + '%')}</span>
                                
                            }
                            </span>
                           
                                 </span>
                                
                        </div>
               :<span></span> }</span>

                        <div className='currencyIndicator'>{currency}</div>

                    </div>
                                                                         
                </div>

                
            <div  className={styles.b_w}  >
            
                <div style={{display:'flex',width:'300px',justifyContent:'space-around'}}>
                    <button className={styles.noHover}>
                        Time
                    </button>
                    <button className={styles.btnT} ref={m1} arg='m1'>
                        1m
                    </button>
                    <button className={styles.btnT} ref={m5} arg='5m'>
                        5m
                    </button>
                    <button className={styles.btnT} ref={w1} arg='1w'>
                        1w
                    </button>
                    <button className={styles.btnT} ref={M1} arg='1M'>
                        1M
                    </button>
                    </div>
                </div>
             <CreateChart currency={currency}  time={getTime} fixed={fixed} />
            </div>
    );
}



export default ReturnChart;