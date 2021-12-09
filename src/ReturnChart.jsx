import CreateChart from './Candles';
import React,{useState,useEffect,useRef} from "react";
import searchIcon from './../src/search.png';

const styles = {
    c_w:'wrapper_candles',
    b_w:'b_w',
    btnT:'btnT',
    noHover:'nh'
  }
  

const ReturnChart = ({currency})=>{
    const m1 = useRef();
    const m5 = useRef();
    const w1= useRef();
    const M1 = useRef();
    

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
                
                    <div className='searchBox'>
                        <img src={searchIcon} className='miniicon'/>
                        <input type="text" id='Inp'/>
                        
                    </div>
                    <div className='currencyIndicator'>{currency.toUpperCase()}</div>
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
             <CreateChart currency={currency}  time={getTime}/>
            </div>
    );
}



export default ReturnChart;