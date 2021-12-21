import react,{useEffect,useState,useRef} from "react";

function OrderBook({currency,getTrades}){
    const [getCurrecny,setCurrency] = useState({}); 
    const [api,setData] = useState([]);
    const [sellHistory,setSellHistory] = useState([]);
    const [buyHistory,setBuyHistory] = useState([]);
    const [fetched,isFetched] = useState(false);
    const refCurrencyNow = useRef('btcusdt');
    useEffect(()=>{
      refCurrencyNow.current = currency;
    });
    const nowCurrency = refCurrencyNow.current;

    useEffect(()=>{
        if(currency.toUpperCase() === getTrades.s){
            setCurrency(getTrades)
        }
    },[currency,getTrades]);


    useEffect(()=>{
            async function getData(){
              let crrUpper = currency.toUpperCase();
                let response = await fetch(`https://api.binance.com/api/v3/trades?symbol=${crrUpper}&limit=40`);
                let data = await response.json();
                let parsed = data.map((e)=>{
                    return {
                        id:e.id,
                        t:e.time,
                        q:e.qty,
                        p:e.price,
                        Q:e.quoteQty,
                        m:e.isBuyerMaker,
                        b:e.isBestMatch,
                        c:currency
                    } ;
                });    
                  setData(parsed);
               
                  isFetched(true);
                
                  return isFetched(false);
            }
                setInterval(()=>{ getData()},1500);
           
         
          },[currency]);
        


    useEffect(()=>{
      api.forEach((e)=>{
          if(e.c === currency){
            setSellHistory(()=>{
                let tmp = api;
                for(var j = 0;j<tmp.length;j++){
               for(var i = 0;i<tmp.length-1;i++){
                   if(tmp[i]>tmp[i+1]){
                       var a = tmp[i];
                       tmp[i] = tmp[i+1];
                       tmp[i+1] = a;
                   }
               }
            }
            
               let filtered = tmp.filter((e,i,arr)=>{
                if(arr.length > 12){
                    arr.pop();
                }

                return e
               });
             
               return [...filtered];
            });
          }
      })
            
        
        
       
    },[currency,fetched]);

 


    return(
        <react.Fragment>
            <div className="orderbook_wrapper">
            <div className="top_lvl_orders">
               <ul style={{color:'white'}}>
                {
               sellHistory.map((e,i)=>{
                   return <li key={i}>{e.p}</li>
               })
                }
               </ul>
              
            </div>
            <div className="middle_lvl_price"></div>
            <div className="botttom_lvl_orders"></div>
            </div>

        </react.Fragment>
    )
}

export default OrderBook;