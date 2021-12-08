import react,{useState} from 'react';


function BuySellForm({sell,isSelling}){


    return(
        
        <div className='gg'>
            
            <div className='btn-wp'>
           <input type="button" value='Buy'/>
           <input type="button" value='Sell'/>
           </div>

           <div className='inp_wp'>
           <input type="text" placeholder='Price'/>
           <input type="text" placeholder='Amount'/>
           <input type="range" />
           <input type="button" value={sell === true ?'sell' : 'buy'}/>
           </div>

        </div>
       
    );
}
export default BuySellForm;