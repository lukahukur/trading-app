import react from 'react';


function BuySellForm(){

    return(
        <div className='formJs'>
            
            <div className='btn-wp'>
           <input type="button" value='Buy'/>
           <input type="button" value='Sell'/>
           </div>
           <div className='inp_wp'>
           <input type="text" placeholder='Price'/>
           <input type="text" placeholder='Amount'/>
           <input type="range" />
           </div>

        </div>
    );
}
export default BuySellForm;