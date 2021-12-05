import react from 'react';


function BuySellForm(){

    return(
        <div className='formJs'>
            <span style={{display:'flex',flexDirection:'row'}}></span>
           <input type="button" value='Buy'/>
           <input type="button" value='Sell'/>
           <input type="text" placeholder='Price'/>
           <input type="text" placeholder='Amount'/>
           <input type="range" />

        </div>
    );
}
export default BuySellForm;