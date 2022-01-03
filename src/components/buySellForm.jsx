import react,{useState,useRef, useEffect} from 'react';


function BuySellForm({currency,str,wallet,setWallet,cryptoWallet,setCryptoWallet,getTrades,isDone,fixed,priceVal}){
    const btn_sell = useRef();
    const btn_buy = useRef(); 
    const input_range = useRef();
    const input_total = useRef();
    const input_price = useRef();
    const input_amount = useRef();
    const btn = useRef();
    
    const [sell,isSelling] = useState(false);
  
    
    useEffect(()=>{
      
        btn_buy.current.addEventListener('click',()=>{isSelling(false)})
        btn_sell.current.addEventListener('click',()=>{isSelling(true)})
        input_amount.current.addEventListener('input',()=>{
            input_total.current.value = !parseFloat(input_amount.current.value) || !parseFloat(input_price.current.value)? ' ':parseFloat(input_price.current.value) * parseFloat(input_amount.current.value);

        });
        input_price.current.addEventListener('input',(e)=>{
            input_total.current.value = !parseFloat(input_amount.current.value) || !parseFloat(input_price.current.value)?' ': parseFloat(e.target.value) * parseFloat(input_amount.current.value)
        });
        input_total.current.addEventListener('input',(e)=>{
            input_amount.current.value = !parseFloat(input_total.current.value) || !parseFloat(input_price.current.value)?' ':(parseFloat(e.target.value) / parseFloat(input_price.current.value)).toFixed(

              Number.isInteger(parseFloat(e.target.value) / parseFloat(input_price.current.value)) === true ?0:5 

            )
        });
    },[])
    useEffect(()=>{
        !parseFloat(getTrades.p)? input_price.current.value =' ':input_price.current.value =  parseFloat(getTrades.p).toFixed(fixed);
    },[isDone]);


useEffect(()=>{
    !parseFloat(priceVal)? input_price.current.value =' ':input_price.current.value =  parseFloat(priceVal).toFixed(fixed);
},[priceVal]);




    return(
        
        <div className ='gg'>
            
            <div className='btn-wp'>
           <input type="button" value='BUY' style={sell === false? {background:'rgb(26, 180, 26)',color:'black'}:{}} ref={btn_buy} />
        <input type="button"  value='SELL'style={sell === true? {background:'#F6465D',color:'black'}:{}} ref={btn_sell}/>
        
        </div>
        <div className='Limit'>
            <span style={{color:'#2FF9F6'}}>Limit </span>
        
        <span>Market </span>

        <span>Stop Limit</span>
        
        </div>
        <div className='Avbl'><span>Avbl </span><span style={{color:'rgb(158, 5, 138)'}}>{wallet} USDT</span></div>
        <div className='inp_wp'>
        <div className='inp_wp_div'>  <p>Price</p>
        
        <input type="text" style={{width:'100%'}} ref={input_price}/> 
        
        
        <p style={{color:'white',textTransform: 'uppercase'}}>{'usdt'}</p></div>
        <div  className='inp_wp_div'> <p>Amount</p> <input ref={input_amount} type="text" style={{width:'100%'}}/> <p style={{color:'white',textTransform: 'uppercase'}}>{currency.substring(0,str)}</p> </div>


        <input type="range" className='range_price' min="0" max={wallet}  step="1" ref={input_range} />


        <div className='inp_wp_div' >  <p>Total</p><input ref={input_total} type="text" style={{width:'100%'}} /> <p style={{color:'white',textTransform: 'uppercase'}}>{'usdt'}</p></div>
           <input ref={btn} type="button" value={sell === true ?'SELL' : 'BUY'} style={sell?{backgroundColor:'#F6465D',border:'none',borderRadius:'5px'}:{backgroundColor:'rgb(26, 180, 26)',border:'none',borderRadius:'5px'}}/>
           </div>

        </div>
       
    );
}
export default BuySellForm;