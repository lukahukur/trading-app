import react,{useState} from 'react';


function BuySellForm({sell,isSelling}){


    return(
        
        <div className='gg'>
            
            <div className='btn-wp'>
           <input type="button" value='BUY'/>
        <input type="button" value='SELL'/>
           </div>

           <div className='inp_wp'>
         <div className='inp_wp_div'>  <p>Price</p><input type="text" /></div>
         <div className='inp_wp_div'> <p>Amount</p> <input type="text"/></div>
           <input type="range" />
           <input type="button" value={sell === true ?'sell' : 'buy'}/>
           </div>

        </div>
       
    );
}
export default BuySellForm;