import react,{useState,useRef, useEffect} from 'react';


function BuySellForm({currency,
    str,
    wallet,
    setWallet,
    cryptoWallet,
    setCryptoWallet,
    getTrades,isDone,
    fixed,priceVal,coinsOBJ,
    orders,history,setHistory})
    {
    const btn_sell = useRef();
    const btn_buy = useRef(); 
    // order book//
    const [compare,setComparsion]= useState([]);
    const input_range = useRef();
    const input_total = useRef();
    const input_price = useRef();
    const input_amount = useRef();
    // need this
    const [currentPrice,setCurrentPrice] = useState(0); 
    const btn = useRef();
    const alertRef = useRef();
    const [sell,isSelling] = useState(false);
// this is dot
    const [cmp,setCmp]= useState(0);
    useEffect(()=>{
        switch(currency) {
            case 'btcusdt':
             setCmp(0);
              break;
            case 'shibusdt':
              setCmp(7);
            break;
              case 'dogeusdt':
                  setCmp(3)
            break;
            case 'xrpusdt':
                setCmp(4);
            break;
            case 'solusdt':
                setCmp(1);
                break;
         case 'trxusdt':
              setCmp(6);
          break;    
          case 'uniusdt':
            setCmp(1);
        break;    
        case 'maticusdt':
            setCmp(2)
            break;
        case 'bnbusdt':
            setCmp(1);
            break;
            
            default:
            setCmp(0)
          }
         
    },[currency]);

useEffect(()=>{
setCurrentPrice(parseFloat(getTrades.p))
},[getTrades]);

    
    function trade(){
        if(input_amount.current.value.length === 0 || input_price.current.value.length === 0 || input_total.current.value.length === 0){
            
        }else{
//selling 
        if(sell === true){
            coinsOBJ.map((e,i,arr)=>{
                let mat = 0;
                if(e.market === currency){
                    if(parseFloat(input_amount.current.value) > parseFloat(cryptoWallet[e.coin]) ){
                        alertRef.current.textContent = 'No Enough Crypto'
                        setTimeout(()=>{
                            alertRef.current.textContent = ' ';
                        },2000);
                    }
                    else{
//-------------------------------------------------------------------------------------------------------------------
                      
                           
                            if(currentPrice >= parseFloat(input_price.current.value)){
                            let sum = parseFloat(wallet) + parseFloat(input_price.current.value * input_amount.current.value)
                                mat++;
                            setWallet(sum)
                            setCryptoWallet({...cryptoWallet,[e.coin]:parseFloat(cryptoWallet[e.coin]) - parseFloat(input_amount.current.value)})
                         
                            }
                       
                        if(mat === 0){
                            setHistory([...history,{
                                price:input_price.current.value,
                                time:new Date(),
                                symbol:currency,
                                side:'Sell',
                                amount:input_amount.current.value,
                                total:parseFloat(input_price.current.value * input_amount.current.value)
                            }]);
                        }
//-------------------------------------------------------------------------------------------------------------------
                    }
                }
            })
        }
    ///buying 
        else if(sell === false){
         if((input_amount.current.value * input_price.current.value) > wallet || wallet <= 10){
            alertRef.current.textContent = 'No Enough Money'
            setTimeout(()=>{
                alertRef.current.textContent = ' ';
            },2000);
         }else{
            coinsOBJ.map((e,i,arr)=>{
             let matches = 0;
                if(e.market === currency){
//--------------------------------------------------------------------------------------------------------------------
               
                      
                        if(currentPrice <= parseFloat(input_price.current.value)){
                            const total = parseFloat(input_amount.current.value) * parseFloat(input_price.current.value)
                            setCryptoWallet({...cryptoWallet,[e.coin]:parseFloat(cryptoWallet[e.coin]) + parseFloat(input_amount.current.value)});
                            matches ++ ;
                            setWallet(()=>{
                              return (wallet - total).toFixed(
                               Number.isInteger(wallet-total) === true ?0:2 
                              )
                            });
                        }
                   
                    if(matches === 0){
                        setHistory([...history,{
                            price:input_price.current.value,
                            time:new Date(),
                            symbol:currency,
                            side:'Buy',
                            amount:input_amount.current.value,
                            total:parseFloat(input_price.current.value * input_amount.current.value)
                        }]);
                    }
//--------------------------------------------------------------------------------------------------------------------                  
                }
               });
            }
        }
        }
    }

    useEffect(()=>{
        let b = [];
        for(let i = 0;i<orders.length;i++){
          
               
                b.push(parseFloat(orders[i][0]));
                setComparsion(b);
        }
    },[orders]);

    //  //ვშლით ზაკაზს ეგრევე
    //  let tmp = history;
    //  tmp.splice(p,1);
    //  setHistory([...tmp]);
     
    useEffect(()=>{
         history.forEach((j,i_h)=>{
               //selling 
            if(j.side === 'Sell' && parseFloat(j.price) <= currentPrice){
                console.log('Sell Man',currentPrice);
                  let tmp = history;
                  tmp.splice(i_h,1);
                  setHistory([...tmp]);
                let sum = parseFloat(wallet) + parseFloat(input_price.current.value * input_amount.current.value)
                setWallet(sum)
                setCryptoWallet({...cryptoWallet,[j.symbol.substring(0,str)]:parseFloat(cryptoWallet[j.symbol.substring(0,str)]) - parseFloat(input_amount.current.value)})
            }

            //Buying
           else if(j.side === 'Buy' && parseFloat(j.price) >= currentPrice){
            console.log('Buying Man',currentPrice)
              let tmp = history;
              tmp.splice(i_h,1);
              setHistory([...tmp]);
            const total = parseFloat(input_amount.current.value) *parseFloat(input_price.current.value);

            setCryptoWallet({...cryptoWallet,[j.symbol.substring(0,str)]:parseFloat(cryptoWallet[j.symbol.substring(0,str)]) + parseFloat(input_amount.current.value)});
            setWallet(()=>{
              return (wallet - total).toFixed(
               Number.isInteger(wallet-total) === true ?0:2 
              )
            });

            }
            
         });

    },[history,currentPrice]);


useEffect(()=>{
    console.log(cryptoWallet)
},[cryptoWallet]);



    useEffect(()=>{
        input_total.current.value = parseFloat(input_price.current.value)*parseFloat(input_amount.current.value) ;
       
    },[priceVal]);
    useEffect(()=>{
      
    
        input_amount.current.addEventListener('input',()=>{
            input_total.current.value = !parseFloat(input_amount.current.value) || !parseFloat(input_price.current.value)? ' ':(parseFloat(input_price.current.value) * parseFloat(input_amount.current.value)).toFixed(
                Number.isInteger(parseFloat(input_price.current.value) * parseFloat(input_amount.current.value)) === true ?0:3 
            );
           
        });
        input_price.current.addEventListener('input',(e)=>{
            input_total.current.value = !parseFloat(input_amount.current.value) || !parseFloat(input_price.current.value)?' ': parseFloat(e.target.value) * parseFloat(input_amount.current.value)
        });
        input_total.current.addEventListener('input',(e)=>{
            input_amount.current.value = !parseFloat(input_total.current.value) || !parseFloat(input_price.current.value)?' ':(parseFloat(e.target.value) / parseFloat(input_price.current.value)).toFixed(

              Number.isInteger(parseFloat(e.target.value) / parseFloat(input_price.current.value)) === true ?0:5 

            )
            input_range.current.value = !parseFloat(input_total.current.value) ? 0:parseFloat(input_total.current.value)
        });
        input_range.current.addEventListener('input',(e)=>{
            input_amount.current.value = !parseFloat(input_price.current.value)?' ':(e.target.value / input_price.current.value).toFixed(
                Number.isInteger(parseFloat(e.target.value) / parseFloat(input_price.current.value)) === true ?0:5 
            );
            input_total.current.value = !parseFloat(input_amount.current.value) || !parseFloat(input_price.current.value)? ' ':(parseFloat(input_price.current.value) * parseFloat(input_amount.current.value)).toFixed(
                Number.isInteger(parseFloat(input_price.current.value) * parseFloat(input_amount.current.value)) === true ?0:3 

            );
         
        });
       
    },[])


    useEffect(()=>{
        !parseFloat(getTrades.p)? input_price.current.value =' ':input_price.current.value =  parseFloat(getTrades.p).toFixed(fixed);
    },[isDone]);


useEffect(()=>{
    !parseFloat(priceVal)? input_price.current.value =' ':input_price.current.value =  parseFloat(priceVal).toFixed(fixed);
},[priceVal]);




    return(
        
        <div className ='gg'>
            
            <div className='btn-wp'>
           <input type="button" value='BUY' onClick={()=>{isSelling(false)}} style={sell === false? {background:'rgb(26, 180, 26)',color:'black'}:{}} ref={btn_buy} />
        <input type="button"  value='SELL' onClick={()=>{isSelling(true)}} style={sell === true? {background:'#F6465D',color:'black'}:{}} ref={btn_sell}/>
        
        </div>
        <div className='Limit'>
            <span style={{color:'#2FF9F6'}}>Limit </span>
        
        <span>Market </span>

        <span>Stop Limit</span>
        
        </div>
        <div className='Avbl'><span>Avbl </span><span style={{color:'rgb(158, 5, 138)'}}>{wallet} USDT</span></div>
        <div className='inp_wp'>
        <div className='inp_wp_div'>  <span>Price</span>
        
        <input type="number" min='0' style={{width:'100%'}} ref={input_price}/> 
        
        
        <span style={{color:'white',textTransform: 'uppercase',fontFamily:'plexRegular',fontSize:'14px'}}>{'usdt'}</span></div>
        <div  className='inp_wp_div'> <span>Amount</span> <input min='0' ref={input_amount} type="number" style={{width:'100%'}}/> <p style={{color:'white',textTransform: 'uppercase',fontFamily:'plexRegular',fontSize:'14px'}}>{currency.substring(0,str)}</p> </div>


        <input type="range" className='range_price' min="0" max={wallet}  step={wallet> 1?0.1:0.01 } ref={input_range} />


        <div className='inp_wp_div' >  <span>Total</span><input min='0' ref={input_total} type="number" style={{width:'100%'}} /> <p style={{color:'white',textTransform: 'uppercase',fontFamily:'plexRegular',fontSize:'14px'}}>{'usdt'}</p></div>
           <input onClick={()=>{trade()}} ref={btn} type="button" value={sell === true ?'SELL' : 'BUY'} style={sell?{backgroundColor:'#F6465D',border:'none',borderRadius:'5px',cursor:'pointer'}:{backgroundColor:'rgb(26, 180, 26)',border:'none',borderRadius:'5px',cursor:'pointer'}}/>
           <div className='alertJan' ref={alertRef}></div>
           </div>

        </div>
       
    );
}
export default BuySellForm;