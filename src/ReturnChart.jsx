import CreateChart from './Candles';
import React,{useState,useEffect,useRef} from "react";
import searchIcon from './../src/search.png';

const styles = {
    c_w:'wrapper_candles',
    b_w:'b_w',
    btnT:'btnT',
    noHover:'nh'
  }
  

const ReturnChart = ({currency,coinsOBJ,setCurrency})=>{
  

    const [change24hr,set24rhchange] = useState([]);
    const m1 = useRef();
    const m5 = useRef();
    const w1= useRef();
    const M1 = useRef();
    const d_ref = useRef();
    const input_ref = useRef();
    const li = useRef();

    const [arr_of_coins,setC] = useState([...coinsOBJ]) ;
  
    useEffect(()=>{
        const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
        ws.onmessage = (e)=>{
            const parsedData = JSON.parse(e.data);
            set24rhchange(parsedData)
            
        }
       
    },[currency]);
  
  useEffect(()=>{
       

  },[change24hr,currency]);
  useEffect(()=>{
     
    for(var i =0;i<li.current.childNodes.length;i++){
        li.current.childNodes[i].addEventListener('click',changeState__Coin)
        if(li.current.childNodes[i].childNodes[0].getAttribute('data') === currency){
            li.current.childNodes[i].removeEventListener('click',changeState__Coin);
        }
 }

    let clicked= 0;
    function changeState__Coin(e){
        if(clicked === 0){
            setCurrency(e.target.getAttribute('data'));
            document.getElementsByClassName('tv-lightweight-charts')[0].remove();
        }
        clicked ++;
       }

       input_ref.current.addEventListener('input',(event)=>{
        let temp = [];
  
        coinsOBJ.filter((e)=>{
            //repeated code
            //yes,Im lazy ass
            for(var i =0;i<li.current.childNodes.length;i++){
                li.current.childNodes[i].addEventListener('click',changeState__Coin)
                if(li.current.childNodes[i].childNodes[0].getAttribute('data') === currency){
                    li.current.childNodes[i].removeEventListener('click',changeState__Coin);
                }
         }
                if(e.market.includes(event.target.value.toLowerCase()) === true){
                    temp.unshift(e);
                    setC([...temp])
                    
                }
            
               
        })
        
      
   });
       
  },[currency]);

    
    const mappedCoinList = arr_of_coins.map((e,i)=>{return <li className='li_search' key={i}>
          <span data={e.market}>{e.coin}<span style={{color:'gray'}} data={e.market}> /USDT</span></span></li>});
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
                     <div className='searchBox'><img src={searchIcon} className='miniicon'/>
                        
                        <input type="text" id='Inp' ref={input_ref} autoComplete="off" placeholder={currency.toUpperCase()}/>


                        <div className='dropDown' ref={d_ref} >
                            
                            <ul className={'ul_search'} ref={li} >
    
                                {
                                mappedCoinList
                                }
                                
                            </ul>
                           </div>  
                        
                      </div>
                        <div className='hr_24_crr' >
                            <span className='clm'>
                            <span>24h High</span>
                            {
                            change24hr.map((e,i)=>{
                                if(currency.toUpperCase() === e.s){
                                    return <span className='w' key={i}>{parseFloat(e.h).toFixed(2)}</span>
                                }
                            })
                            
                        }</span>

                        <span className='clm l'>
                            <span>24h Low</span>
                            {
                            change24hr.map((e,i)=>{
                                if(currency.toUpperCase() === e.s){
                                    return <span className='w' key={i}>{parseFloat(e.l).toFixed(2)}</span>
                                }
                            })
                            
                        }</span>
                          <span className='clm l'>
                            <span>24h change</span>
                            <span className='s_w2'>
                            {
                            change24hr.map((e,i)=>{
                                if(currency.toUpperCase() === e.s){
                                    return <span className='w' key={i} style={e.p > 0? {color:'#0ECB81'}:{color:'#F6465D'}}>{(parseFloat(e.p))}</span>
                                }

                            })}
                            
                            {
                            change24hr.map((e,i)=>{
                                if(currency.toUpperCase() === e.s){
                                    return <span className='w' key={i} style={e.p > 0? {color:'#0ECB81'}:{color:'#F6465D'}}>{(parseFloat(e.P).toFixed(2) + '%')}</span>
                                }
                            })}</span>
                                 </span>
                        
                        </div>
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
             <CreateChart currency={currency}  time={getTime} />
            </div>
    );
}



export default ReturnChart;