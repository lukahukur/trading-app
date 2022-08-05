import React,{useEffect,useRef} from "react";
import {useGetDataQuery, } from "../../store/dataQuery";
import {useSelector} from 'react-redux';
import {createChart} from '@qognicafinance/react-lightweight-charts'


function Chart(){
    const symbol = useSelector(state => state.symbol.symbol);
    const time = useSelector(state => state.symbol.time)
    const chartRef = useRef();
    const {data=[],isLoading} = useGetDataQuery({s:symbol.toUpperCase(),t:time,c:1000});
    /*
    Relative chart sizes
    */ 
    const [size,setSize] = React.useState(window.innerWidth <= 1920 && window.innerWidth > 1475 ?{
      w:window.innerWidth-720,
      h:499
    } : window.innerWidth <= 1475 && {w:window.innerWidth-550,h:450})  


    const cData = isLoading === false && data.map((e)=>{
    return {
      time:e[0]/1000,
      open:parseFloat(e[1]),
      high:parseFloat(e[2]),
      low:parseFloat(e[3]),
      close:parseFloat(e[4])     
    }});
    
  /*
  here I created chart and applied options
  learn more about this library on this webpage 
  https://github.com/Qognica/qognicafinance-react-lightweight-charts
  */
 
    useEffect(()=>{
      const chart = createChart(chartRef.current, { width:size.w, height:size.h});
      const candles =  chart.addCandlestickSeries();
    
      candles.applyOptions({

        wickVisible: true,
        priceScale: {
          position: 'right',
          invertScale: false,
          autoScale:true,
          borderVisible: true,
          borderColor: '#272D35',
      },
      priceFormat: {
        type: 'custom',
        minMove: 0.0000001,
      formatter: price => '$' +Number(price)
      //float
      //zero counter
     .toFixed( (-Math.floor( Math.log(Number(price)) / Math.log(10) + 1)) >=4? 7:2 )
     
    },
        upColor: '#0ECB81',
        downColor: '#F6465D',
        borderVisible: false,
    }
    
    );
  chart.applyOptions({
    timeScale: {
/*
        CUSTOMIZATION
*/
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
        fontSize: 11,
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

  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${time}`);
  /* 
  Realtime Update
  */ 
  function msg(e){
  const t = JSON.parse(e.data)
    candles.update({
        time: t.k.t/1000,
        open: t.k.o,
        high: t.k.h,
        low: t.k.l,
        close: t.k.c,
      });
  }
  
  ws.addEventListener('message',msg);
  
  // add fetched data
  function addData(){
    candles.setData(cData)
  }

isLoading === false && addData();

  
   return ()=>{
    // this library has a problem with re rendering, so I used this method to clean up chart after it receives data from fetch request
    chartRef.current.removeChild(chartRef.current.children[0])
    ws.removeEventListener('message',msg)
    ws.close();
   }
  
  },[cData,size]);


  /*
  Relative sizes
  */
useEffect(()=>{
    const handler = () => {
     if(window.innerWidth <= 1920 && window.innerWidth > 1660){
      setSize({w:window.innerWidth-720,h:499})
   //1670
     }else if(window.innerWidth <= 1660){
      setSize({w:1100,h:499})
    }
      
      
  };
  window.addEventListener('resize', handler);
  return () => {
      window.removeEventListener('resize', handler);
  };
   },[])

return (
<div ref={chartRef}></div>
)
}
export default React.memo(Chart);
