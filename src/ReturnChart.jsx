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
    const fnc = ()=>{console.log('please do it')};
    const [clicked,setClicked] = useState(0);
    const m1 = useRef();
    const m5 = useRef();
    const w1= useRef();
    const M1 = useRef();
    const d_ref = useRef();
    const input_ref = useRef();
    const li = useRef();
  
    const [arr_of_coins,setC] = useState([...coinsOBJ]) ;


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
      
  

    },[]);
   //luka mere gadaakete attributshi chasmuli mnishvnelobidan debili imis amgeba 
//    let counter = 0;
        useEffect(()=>{
            function changeState__Coin(e){
                setCurrency(e.target.getAttribute('data'));
                document.getElementsByClassName('tv-lightweight-charts')[0].remove()
                setClicked(clicked +1)
               }
            for(var i =0;i<li.current.childNodes.length;i++){

                li.current.childNodes[i].addEventListener('click',changeState__Coin)
                if(li.current.childNodes[i].childNodes[0].getAttribute('data') === currency){
                 li.current.childNodes[i].removeEventListener('click',changeState__Coin)
                 console.log('yes')
                 
             }else{
                 console.log('continue')
                 continue;
               
             }
         }
        },[clicked]);

    
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
                        
                        <input type="text" id='Inp' ref={input_ref} autoComplete="off"/>


                        <div className='dropDown' ref={d_ref} >
                            
                            <ul className={'ul_search'} ref={li} >
    
                                {
                                mappedCoinList
                                }
                                
                            </ul>
                         </div>  
                        
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
             <CreateChart currency={currency}  time={getTime}/>
            </div>
    );
}



export default ReturnChart;