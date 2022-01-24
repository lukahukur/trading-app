import react,{useEffect} from "react";
//price 
//time 
//symbol 
//side
//amount
//total

function History({history,setHistory}){
    function cs(event){
            history.forEach((asdf,i) => {
                if(event === i ){
                    let tmp = history;
                    for(let j =0;j<tmp.length;j++){
                        if(j === i){
                           tmp.splice(j,1)
                        }
                    }
                        setHistory([...tmp])
                }
            });
    }
const hstr = react.useMemo(()=>{
    let g = history.map((e,i)=>{
        console.log()
       return <div className='history_' key={i}  >
             <span style={{color:'#5E6673'}}> 
             <span>{e.time.getFullYear()}</span>
                <span>-</span>
                <span>{e.time.getDate().toString().length < 2?'0'+e.time.getDate() :e.time.getDate() }</span>   
                <span>-</span>
                <span>{(1 + e.time.getMonth()).toString().length < 2?'0'+(1+e.time.getMonth()).toString(): (1+e.time.getMonth()).toString() }</span>  
                <span> </span>
              {e.time.toLocaleTimeString('en-US')}</span>
           <span style={{color:'rgb(158, 5, 138)'}}> {e.symbol.toUpperCase()}</span>
            <span style={e.side === 'Buy' ? {color:'#007E04',fontFamily:'plex'}:{color:'rgb(150, 4, 4)',fontFamily:'plex'}}> {e.side}</span>
        <span> {e.price}</span>
        
       
        <span> {e.amount}</span>
        <span> {e.total}</span>
        <span className="rmv" onClick={()=>{cs(i)}}>Remove</span>
           </div>
    });
    return g;
},[history]);
    return(
        <div className="h_wrp">
            <div className="dsp_flx">Order History</div>
            <div className="dsp_grd">
                <div className="dsp_grd_h">
                    <span>Time</span>
                    <span>Symbol</span>
                    <span>Side</span>
                    <span>Price</span>
                    <span>Amount</span>
                    <span>Total</span>
                </div>
                <div className="H_wPP">
                {hstr}
                </div>
            </div>
        </div>
    )
}
export default History;