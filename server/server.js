import request from 'request'
import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const PORT = 2004;
let COUNT = 1;
let SYMBOL = 'BTCUSDT'
let TIME  = '1w'
app.use(bodyParser.json());
 app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods',"GET,POST");
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
 })


//gzavni res it
app.get('/:s/:t/:c',async(req,res)=>{
    const {address,port,family} = req.socket.address()
    console.log(address,port,family,'is calling')
    request({
        url:`https://api.binance.com/api/v3/klines?symbol=${req.params.s}&interval=${req.params.t}&limit=${req.params.c}`,
        json:true
    },(err,response,body)=>{
            res.send(body)
    });


});
app.get('/:cnt/:s',async(req,res)=>{
    const {address,port,family} = req.socket.address()
    console.log(address,port,family,'is calling')
    request({
        url:`https://api3.binance.com/api/v3/aggTrades?symbol=${req.params.s}&limit=${req.params.cnt}`,
        json:true
    },(err,response,body)=>{
            res.send(body)
    });


});

app.post('/',(res,req)=>{
  res.body.COUNT = COUNT;
  res.body.SYMBOL = SYMBOL;
  res.body.TIME = TIME;

    req.send('ya man received thanks ')
})


app.listen(PORT,()=>{
    console.log(`server is running http://localhost:${PORT}`)
})



