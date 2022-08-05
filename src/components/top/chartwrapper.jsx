import Chart from "./chart"
import icon from '../../icons/search.png'
import { useEffect,useRef,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { changeTime } from "../../store/symbolSlice"

export default function ChartWrapper(){
    const dispatch = useDispatch();
    const time = useSelector(state => state.symbol.time);
    const site = useSelector(state => state.symbol.symbol);
    const price = useSelector(state => state.data.stream400ms);
    const c = useSelector(state => state.symbol.coins)
    const [coins,setCoins] = useState(c);
    const [volume,setVolume] = useState('');
    const inp_ref = useRef();
    const drp = useRef();


    useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${site}@ticker`);
        function messageHandler(e){
            const d = JSON.parse(e.data)
            setVolume(d)
        }
        function fltr(e){
            !!e.target.value? setCoins(
                coins.filter(elem=> elem.coin.includes(e.target.value.toLowerCase().trim())))
                    :setCoins(c)
        }
        inp_ref.current.addEventListener('input',fltr)
        ws.addEventListener('message',messageHandler);
        return ()=>{
        ws.removeEventListener('message',messageHandler);
        inp_ref.current.removeEventListener('input',fltr)
        }
    }, [])
    
    const styles={
        time:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            paddingLeft:'10px',
            justifyContent:'space-between',
            width:'300px',
            height:'35px',
        },
        btn:{
            background:'none',
            border:'none',
            display:'flex',
            
        
        },
        volume_wrp:{
            justifyContent:'space-between',
            display:'flex',
            borderLeft:'1px solid #272D35',
            height:'40px',
            alignItems:'center',
            marginLeft:'12px',
            width:'100%',
        },
        prc:{
            display:'flex',
            flexDirection:'column',
            fontSize:'14px'
        },
        fnt:{
            fontSize:'14px'
        },
       
        
    }
    
    function clr(e){
      return time === e?'blue':'gr'
    }
   
return(
    < >

      <span style={{display:'flex',flexDirection:'column',border:'1px solid var(--border)',borderLeft:'none',borderTop:'none',borderRight:'none'}}>
        <span style={{borderBottom:'1px solid var(--border)'}}>
                <span style={{'margin':'12px','display':'flex','alignItems':'center'}}> 
                    <span className="inp_wrap">

                    <input type="text" ref={inp_ref} className='gg' style={{  'background':'#15191D','border':'none','height':'40px'}} placeholder={site.toUpperCase()}/>

                    <ul className="dropDown"   ref={drp} >
                     {
                      coins.map((e)=>{
                        return <li className="gray"  style={{marginTop:'5px',fontSize:'14px'}} key={e.id}>
                            <a href={`/${e.coin}usdt`}>{e.coin.toUpperCase()}/USDT</a>
                        </li>
                      })
                     }
                    </ul>

                    <img src={icon} alt="srch" width={'33px'} height={'33px'} />  
                    </span>
                   { !!volume && <span style={styles.volume_wrp}>
                    <div style={{display:'flex',width:'650px',justifyContent:'space-around'}}>
                                    <span style={styles.prc}>
                                        <span style={styles.fnt} className="gr">
                                        Price
                                        </span>
                                        <span style={{color:'#9E058A',fontSize:'14px'}}>
                                          {parseFloat(price.p).toFixed(4)}
                                        </span>
                                    </span>

                                    <span style={styles.prc}>
                                        <span style={styles.fnt} className="gr">
                                        24h High
                                        </span>
                                        <span >
                                          {Number(volume.h)}
                                        </span>
                                    </span>

                                    <span style={styles.prc}>
                                        <span style={styles.fnt} className="gr">
                                        24h Low
                                        </span>
                                        <span >
                                          {Number(volume.l)}
                                        </span>
                                    </span>

                                    <span style={styles.prc}>
                                        <span style={styles.fnt} className="gr">
                                        24h volume <span style={{color:'#9E058A'}}>{site.slice(0,site.length >7 ? 4:3).toUpperCase()}</span>
                                        </span>
                                        <span >
                                          {Number(volume.v)}
                                        </span>
                                    </span>
                                    <span style={styles.prc}>
                                        <span style={styles.fnt} className="gr">
                                        24h Change
                                        </span>
                                        
                                        <span style={{display:'flex',width:'100px'}}>
                                            <span style={volume.p >= 0? {color:'#1AA517',marginRight:'7px'}:{color:'rgb(200 2 28)',marginRight:'7px'}}>{Number(volume.p)}</span>
                                            <span style={volume.p >= 0? {color:'#1AA517',marginRight:'7px'}:{color:'rgb(200 2 28)',marginRight:'7px'}}> {volume.P}%</span>
                                        </span>
                                    </span>


                    </div>
                                <span style={{'color':'#2CEBE3',fontSize:'20px'}}>
                                {site.slice(0,site.length >7 ? 4:3).toUpperCase()}/USDT
                                </span>
                    </span>
                    }
                </span>
        </span>
            <span style={styles.time} >
             <p style={{'color':'rgb(132, 142, 156)',}}>Time</p>
             <button style={styles.btn} onClick={()=>{dispatch(changeTime('1m'))}} className={clr('1m')}>1m</button>
             <button style={styles.btn} onClick={()=>{dispatch(changeTime('5m'))}} className={clr('5m')}>5m</button>
             <button style={styles.btn} onClick={()=>{dispatch(changeTime('1d'))}} className={clr('1d')}>1D</button>
             <button style={styles.btn} onClick={()=>{dispatch(changeTime('1w'))}} className={clr('1w')}>1w</button>
             <button style={styles.btn} onClick={()=>{dispatch(changeTime('1M'))}} className={clr('1M')}>1M</button>
            </span>
         
        </span>
   
        <Chart/>

    </>
)
}
