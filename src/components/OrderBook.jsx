import react,{useEffect,useState} from "react";

function OrderBook({currency,getTrades}){
    const [getCurrecny,setCurrency] = useState({}); 
    const [sellHistory,setSellHistory] = useState([]);
    const [buyHistory,setBuyHistory] = useState([]);

    useEffect(()=>{
        if(currency.toUpperCase() === getTrades.s){
            setCurrency(getTrades)
        }
    },[currency,getTrades]);
    useEffect(()=>{
        if(getCurrecny.m === true){
            
        
        }else{
            setBuyHistory(getCurrecny.p)
        }
       
    },[currency,getCurrecny]);
    
    return(
        <react.Fragment>
            <div className="orderbook_wrapper">
            <div className="top_lvl_orders"></div>
            <div className="middle_lvl_price"></div>
            <div className="botttom_lvl_orders"></div>
            </div>

        </react.Fragment>
    )
}

export default OrderBook;