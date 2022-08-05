import {useEffect,useState,useRef} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { startConnecting,receiveMessage } from '../../store/dataSlice';



export function OrderBook(){
  const site = useSelector(state => state.symbol.symbol);
  const strm = useSelector(state => state.data.stream400ms);
  const [depth,setDepth] = useState({asks:'',bids:''});
  const [wssIsOpen,setIfIsOpen] = useState(false);
  const prevValue = useRef('');


useEffect(()=>{
  return ()=>{
    prevValue.current = strm.p
  }
},[strm])


  //connectin to depth websocket
useEffect(()=>{
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${site}@depth10@1000ms`);

  const opnHndlr = (e)=>{
    setIfIsOpen(true)
  }
  const msgHandler = (e)=>{
    const d = JSON.parse(e.data)
   setDepth({
      asks:d.asks,
      bids:d.bids
    })
  }
  
  ws.addEventListener('message',msgHandler);
  return ()=>{
  ws.removeEventListener('message',msgHandler)
  }
},[site])


  const colors  = !strm.p ||strm.p === prevValue.current?{'color':'white'}:prevValue.current < strm.p ?{'color':'rgb(14, 203, 129)'}:{'color':'rgb(246, 70, 93)'}

  const Asks = depth.asks !== '' && depth.asks.map((e,i)=>{
    return <li key={i} style={{"display":'flex','justifyContent':'space-around','height':'23px','fontSize':'14px'}}>
      <span className='cntr pddding'>
      <span style={{'color':'#F6465D'}}>{Number(e[0])}</span>
      </span>
      <span className='cntr rght pddding'>
      <span className='colorGray'>{Number(e[1])}</span>
      </span>
      <span className='cntr rght pddding'>
      <span className='colorGray'>{Number(e[1] * e[0]).toFixed(2)}</span>
      </span>
    </li>
  })

  const Bids = depth.asks !== '' && depth.bids.map((e,i)=>{
    return <li key={i} style={{"display":'flex','justifyContent':'space-around','height':'23px','fontSize':'14px'}}>
      <span className='cntr pddding'>
      <span style={{'color':'#0ECB81'}}>{Number(e[0])}</span>
      </span>
      <span className='cntr rght pddding ' >
      <span className='colorGray'>{Number(e[1])}</span>
      </span>
      <span className='cntr rght pddding'>
      <span className='colorGray'>{Number(e[1] * e[0]).toFixed(2)}</span>
      </span>
    </li>
  })



    return(
        <div id='orderBook' >
          
          <div className='pddding' style={{'height':'56px','display':'flex','alignItems':'center',}}>Order Book</div>    
          <div className='pddding' style={{'display':'flex','alignItems':'center','justifyContent':'space-between',}}> 
          <span className='clrGray '>Price</span>

          <span style={{'width':'90px','display':'flex','justifyContent':'right'}} >
          <span className='clrGray '>Amount</span>
          </span>

          <span style={{'display':'flex','justifyContent':'right'}}>
          <span className='clrGray  '>Total</span>
          </span>
          </div>
          <ul className='bid-or-ask'>
            {
            Asks
            }
          </ul>
         {
         prevValue.current !==undefined && prevValue.current !== ''  && 
       
         <div className='mid pddding'>
          <span style={{'display':'flex','alignItems':'baseline',}}>
            <span style={{'width':'20px'}}> 
                <svg height="20" viewBox="0 0 24 24"  width='20'preserveAspectRatio="none" className={!prevValue.current || prevValue.current === strm.p?'displayNone':'displayBlock'} style={strm.p > prevValue.current?{transform:'rotate(180deg)',opacity:1,fill:'rgb(14, 203, 129)'}:{transform:'rotate(0deg)',opacity:1,fill:'rgb(150, 4, 4)'}}>
                  <path d="M5 13.47l1.41-1.41 5.1 5.1V3h1.99v14.15l5.09-5.09L20 13.47l-7.5 7.5-7.5-7.5z" />
                </svg>
            </span>

            <span style={ colors}   >
           { Number(strm.p)}
            </span>
          </span>

          <span style={{'fontSize':'17px','color':'rgb(132, 142, 156)','marginRight':'70px'}}>{Number(prevValue.current)}</span>

         
          </div>

          }


          <div className='bid-or-ask'>
            
            {
            Bids
            }
            
            </div>
        </div>
    )
}