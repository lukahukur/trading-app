import react,{useState,useRef, useEffect} from 'react';


function BuySellForm({sell,isSelling,currency}){
    const btn_sell = useRef();
    const btn_buy = useRef(); 
    
    useEffect(()=>{
        
        btn_buy.current.addEventListener('click',()=>{isSelling(false)})
        btn_sell.current.addEventListener('click',()=>{isSelling(true)})
    },[])
    

    return(
        
        <div className ='gg'>
            
            <div className='btn-wp'>
           <input type="button" value='BUY' style={sell === false? {background:'#0ECB81',color:'black'}:{}} ref={btn_buy} />
        <input type="button"  value='SELL'style={sell === true? {background:'#F6465D',color:'black'}:{}} ref={btn_sell}/>
        </div>

        <div className='inp_wp'>
        <div className='inp_wp_div'>  <p>Price</p><input type="text" style={{width:'100%'}} /> <p style={{color:'white',textTransform: 'uppercase'}}>{'usdt'}</p></div>
        <div className='inp_wp_div'> <p>Amount</p> <input type="text" style={{width:'100%'}}/> <p style={{color:'white',textTransform: 'uppercase'}}>{currency.substring(0,3)}</p> </div>
        <input type="range" className='range_price'/>
           <input type="button" value={sell === true ?'SELL' : 'BUY'} style={sell?{backgroundColor:'#F6465D',border:'none',borderRadius:'5px'}:{backgroundColor:'#0ECB81',border:'none',borderRadius:'5px'}}/>
           </div>

        </div>
       
    );
}
export default BuySellForm;