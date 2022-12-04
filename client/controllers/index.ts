import { HistogramData, ISeriesApi, OhlcData } from "lightweight-charts";
import { BinanceRestApiResponseType, BinanceStreams, tailwindTheme, WsResponseTypeKline } from "../types";


export function timeToLocal(originalTime:any) {
    const d = new Date(originalTime);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
}

export function updateCandlesticSeries(isWss:boolean,data__:BinanceRestApiResponseType | WsResponseTypeKline,chart:ISeriesApi<'Candlestick'>){
    if(isWss){
        let data = (data__ as WsResponseTypeKline).k
        chart.update({
            time:timeToLocal(data.t)/1000,
            open:parseFloat(data.o),
            close:parseFloat(data.c),
            high:parseFloat(data.h),
            low:parseFloat(data.l),
         } as OhlcData);
    }else{
        let data = (data__ as BinanceRestApiResponseType)
        chart.update({
            time:timeToLocal(data[0] as number)/1000,
            open:parseFloat(data[1]),
            close:parseFloat(data[4]),
            high:parseFloat(data[2]),
            low:parseFloat(data[3]),
         } as OhlcData)
    }
  
};

export function updateVolumeSeries(isWss:boolean,data__:BinanceRestApiResponseType | WsResponseTypeKline,chart:ISeriesApi<'Histogram'>,colors?:{upColor:string,downColor:string}){
   if(!isWss){
        if(!colors){
            let data = (data__ as BinanceRestApiResponseType)
            chart.update({
                time:timeToLocal(data[0] as number)/1000,
                value:parseFloat(data[5]),
                color:data[4] > data[1]?'rgba(38,198,218, 1)':'rgba(239,83,80,1)'
            } as HistogramData)
        }else{
            let data = (data__ as BinanceRestApiResponseType);
            chart.update({
                time:timeToLocal(data[0] as number)/1000,
                value:parseFloat(data[5]),
                color:data[4] > data[1]?colors.upColor:colors.downColor
            } as HistogramData)
        }
   }else{
        if(!colors){
            let data = (data__ as WsResponseTypeKline).k
            chart.update({
                time:timeToLocal(data.t as number)/1000,
                value:parseFloat(data.v),
                color:data.c > data.o?'rgba(38,198,218, 1)':'rgba(239,83,80,1)'
            } as HistogramData)
        }else{
            let data = (data__ as WsResponseTypeKline).k
            chart.update({
                time:timeToLocal(data.t as number)/1000,
                value:parseFloat(data.v),
                color:data.c > data.o?colors.upColor:colors.downColor
            } as HistogramData)
        }
   } 
 
}
export type coinsType =  "btc" |
              "usdt"|            
              "bnb" |           
              "ada" |            
              "dot" |            
              "eth" |   
              "ltc" |   
              "matic"|   
              "shib"|    
              "sol" |    
              "uni" |    
              "xrp";
export function fixed(c:coinsType){
    switch(c){
        case "btc" || "eth":
            return 6;
        case "bnb" || "dot" || "ltc" || "sol":
            return 4;
        default:
            return 2
    }
}