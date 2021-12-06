import React,{useState,useEffect,useRef} from "react";
import { createChart } from 'lightweight-charts';



const CreateChart = ({currency,time}) =>{
 const [lastCandle,setLastCandle] = useState({});
 const [initCandles, setInitCandles] = useState([]);
  const chartRef = useRef();
 
const [sizes,setSizes] = useState({
  width:1200,
  height:500
})


  useEffect(()=>{
          

    async function getCandleData(){
      let crrUpper = currency.toUpperCase();
      
        let response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${crrUpper}&interval=${time}&limit=1000`)
        let data = await response.json();
       
        let cData = await data.map((d)=>{
            return {time: d[0]/1000, open:parseFloat(d[1]) , high:parseFloat(d[2]) , low: parseFloat(d[3]), close:parseFloat(d[4]) }
        });
        setInitCandles(cData)
        document.getElementsByClassName('tv-lightweight-charts')[0].remove();
       
    }
     getCandleData();
    
  },[time]);
  

    useEffect(()=>{
  
        const chart = createChart(chartRef.current, { width: sizes.width, height: sizes.height });
        const candles =  chart.addCandlestickSeries();
        candles.applyOptions({
          upColor: '#0ECB81',
          downColor: '#F6465D',
          borderVisible: false,
      
      });
        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#6495ED',
          downColor: '#FF6347',
          wickVisible: true,
      } );
      chart.applyOptions({
        priceScale: {
            position: 'right',
            autoScale: true,
            invertScale: false,
            borderVisible: true,
            borderColor: '#272D35',
        },
        //////
    });
    chart.applyOptions({
      timeScale: {
          rightOffset: 12,
          barSpacing: 3,
          fixLeftEdge: true,
          lockVisibleTimeRangeOnResize: true,
          rightBarStaysOnScroll: true,
          borderVisible: true,
          borderColor: '#272D35',
          visible: true,
          timeVisible: true,
          secondsVisible: false,
      },
  });
    chart.applyOptions({
      layout: {
          background: {
          color:'#161A1E'
            
          },
          textColor: '#5E6673',
          fontSize: 10,
          fontFamily: 'Calibri',
      },
  });
  chart.applyOptions({
    grid: {
        vertLines: {
          color: '#272D35',
          style: 1,
          visible: true,
        },
        horzLines: {
          color: '#272D35',
          style: 1,
          visible: true,
        },
    },
});
   
      
        candles.setData(initCandles);
     
     
    
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currency}@kline_${time}`);
      
   
      ws.onmessage = (e)=>{

  const t = JSON.parse(e.data)

  candles.update({
      time: t.k.t/1000,
      open: t.k.o,
      high: t.k.h,
      low: t.k.l,
      close: t.k.c,
    });
  
  };
     return () => ws.close()
     

    },[initCandles,sizes]);

  
     useEffect(()=>{
      const handler = () => {
       
          setSizes({width:window.innerWidth/1.62,height:400})
          document.getElementsByClassName('tv-lightweight-charts')[0].remove();
        
    
    };
    window.addEventListener('resize', handler);
    return () => {
        window.removeEventListener('resize', handler);
      
    };
   
       
     },[])
   useEffect(()=>{
      setSizes({width:window.innerWidth/1.62,height:400});
      document.getElementsByClassName('tv-lightweight-charts')[0].remove();
   },[]);
   
  

           return(
             <React.Fragment className='React_fragment'>
               
                <div ref={chartRef}></div> 
              
               
   
             </React.Fragment>
    
           );

}
  export default CreateChart;