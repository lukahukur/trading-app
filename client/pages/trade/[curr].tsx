import { GetServerSideProps, NextPage } from "next"
import Interval from '../../components/chartInterval'
import { useCallback, useEffect,useState } from "react";
import { typedDispatch, typedUseSelector, store, AppDispatch  } from "../../store";
import { startConnecting } from "../../store/binanceStream";
import {changeMarket} from '../../store/market'
import {arrOfStreams, BinanceRestApiResponseType, BinanceStreams,TdepthRestApi,restApiBinanceTradesResponse} from '../../types/index'
import {startConnToDataWs} from '../../store/dbws'
import dynamic from "next/dynamic";
import styles from '../../styles/Market.module.scss'
import Ticker from "../../components/ticker";
import Preloader from "../../components/preloader";
import Orders from '../../components/orderbook';
import Trades from "../../components/trades";
import Bids from '../../components/bids'
import Form from '../../components/Form';
import Wallet from "../../components/wallet";



let fired = false;


export const getServerSideProps:GetServerSideProps = async ({req,res,resolvedUrl})=>{
  let authenticated:boolean;
 const areTokensValid= await fetch('http://localhost:5000/api/__auth',{method:'POST',headers:{
   'content-type':'application/json'
  },
  credentials:'include',
  body:JSON.stringify({
    access:req.cookies.access,
  })
}).then(e => e.json());


 let interval = store().getState().market.time;
 let stream = resolvedUrl.split('/')[2] as BinanceStreams;
 let canPass =  arrOfStreams.includes(stream);
 if(!canPass) return {notFound:true}
console.log()
 let response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${stream.toUpperCase()}&interval=${interval}&limit=1000`).then(e => e.json());  
 let responseDepth = await fetch(`https://api.binance.com/api/v3/depth?symbol=${stream.toUpperCase()}&limit=10`).then(e => e.json());   
 let responseTrades = await fetch(`https://api3.binance.com/api/v3/trades?symbol=${stream.toUpperCase()}&limit=${18}`).then(e => e.json());
 
 if(await areTokensValid.message){
  authenticated = true;
  
  }else{
  authenticated = false;
 }
 
  return {
    props:{
      market:resolvedUrl.split('/')[2],
      response:response,
      responseDepth:responseDepth,
      responseTrades:responseTrades,
      authenticated:authenticated
    }
  }
}

const Chart = dynamic(() => import('../../components/chart2'), {
  ssr:false
});



const Page:NextPage<
    {
      market:BinanceStreams,
      response:BinanceRestApiResponseType[],
      responseDepth:TdepthRestApi,
      responseTrades:restApiBinanceTradesResponse[],
      authenticated:boolean
    }> 
    = ({market,response,responseDepth,responseTrades,authenticated}) => {

  const dispatch = typedDispatch();
  const interval = typedUseSelector(state => state.market.time);
  const [dataState,setData] = useState<BinanceRestApiResponseType[]>(response);
  const [renderChart,allowToRender] = useState<boolean>(false);
  const theme = typedUseSelector(s => s.theme);
  const [depth,setDepth] = useState<TdepthRestApi>(responseDepth)

  let controller1 = new AbortController();
  let controller2 = new AbortController();

  const memo = useCallback(()=>{
    fetch(`https://api.binance.com/api/v3/klines?symbol=${market.toUpperCase()}&interval=${interval}&limit=1000`, {
      signal: controller1.signal
    }).then(e =>e.json()).then(e => setData(e)).catch(err => {});
    
    fetch(`https://api.binance.com/api/v3/depth?symbol=${market.toUpperCase()}&limit=10`,{
      signal: controller2.signal
    }).then(e =>e.json()).then((e)=>{setDepth(e)}).catch(err => {});
  },[interval,market])

  useEffect(()=>{
    memo();  
    return ()=>{
      controller1.abort();
      controller2.abort();
    }
  },[interval,market]);

  useEffect(()=>{
    dispatch(changeMarket(market))
  },[market])

  useEffect(()=>{
    if(!fired){
      dispatch(startConnecting())
      dispatch(startConnToDataWs())
    }
    return ()=>{
      fired = true;
    }
  },[])

    return (

    <div className={styles.parent}>

      {!renderChart && <span 
            className=' w-full h-full overflow-hidden rounded-md bg-darkest absolute z-10000  flex items-center justify-center'>
            <Preloader firstColor={theme.secondaryUp} secondColor={theme.secondaryDown}/>
        </span>
      }
      <div className={styles.chartWrp}>
        <Ticker callback={(e:boolean)=>{allowToRender(e)}}/>
        <Interval/>
        <Chart market={market} renderChart={renderChart} data={dataState}/>
      </div>

      <div className={styles.order}>
        <Orders response={depth}/>
      </div>

      <div className={styles.form}>
          <Form authenticated={authenticated} draw={renderChart} res={responseTrades[0].price}/>
      </div>

      <div className={styles.bids}>
        <Bids authenticated={authenticated}/>
      </div>

      <div className={styles.trades}>
        <Trades responseTrades={responseTrades}/>
      </div>
      <div className={styles.wallet}>
        <Wallet authenticated={authenticated}/>
      </div>
    </div>
    );
}

export default Page
