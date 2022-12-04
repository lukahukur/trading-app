import styles from '../styles/data.module.scss'
import React,{useState,useRef,useEffect,FC, ChangeEvent} from 'react'
import config from '../tailwind.config'
import { typedUseSelector } from '../store';
import { tailwindTheme, Tcoins,} from '../types';
import Link from 'next/link';
import {fixed,coinsType} from '../controllers/index'

const themeTailwind:tailwindTheme = config.theme!.extend!.colors as any;

const Form:FC<{authenticated:boolean,draw:boolean,res:string}> = ({authenticated,draw,res})=>{
    const [isSelling,isMarketMaker] = useState(false);
    const sellBtn = useRef<HTMLButtonElement>(null);
    const coin = (typedUseSelector(store => store.market.market) as string).toUpperCase().slice(0,-4);
    const coinLowerCase = coin.toLocaleLowerCase() as coinsType;
    const buyBtn = useRef<HTMLButtonElement>(null);
    const submit = useRef<HTMLButtonElement>(null);
    const usdt = typedUseSelector(store => store.dbData.wallet.usdt);
    const currentCoin = typedUseSelector(store => store.dbData.wallet)[coin.toLocaleLowerCase() as keyof Tcoins<number>];
    const priceInput = useRef<HTMLInputElement>(null);
    const amountInput = useRef<HTMLInputElement>(null);
    const totalInput = useRef<HTMLInputElement>(null);


    
    const inpTypeRangeChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        let part = Number(e.target.value);    
        let amount = Number((currentCoin * (part/100)).toFixed(fixed(coinLowerCase)));
        amountInput.current!.value = amount.toString();
        totalInput.current!.value = ((Number(priceInput.current!.value) * amount).toFixed(fixed(coinLowerCase))).toString();
    }
    useEffect(()=>{
        if(draw){
            priceInput.current!.value = Number(Number(res).toFixed(fixed(coinLowerCase))).toString();
        }
    },[draw])
    
    useEffect(()=>{
        if(amountInput.current){
            priceInput.current!.value = ''
            amountInput.current!.value=''
            totalInput.current!.value = ''
        }
    },[coin])
    useEffect(()=>{
        if(isSelling && buyBtn.current)
        { 
            buyBtn.current!.style.background = '#374151'
            buyBtn.current!.style.color = 'white';
            sellBtn.current!.style.background = 'hsl(0, 100%, 24%)';
            submit.current!.innerText = 'Sell'
            sellBtn.current!.style.color = 'black'
            submit.current!.style.background ='hsl(0, 100%, 24%)'
        }else if(!isSelling && buyBtn.current)
        {
            sellBtn.current!.style.background = '#374151';
            buyBtn.current!.style.background = 'hsl(142, 76%, 34%)'
            buyBtn.current!.style.color = 'black';
            sellBtn.current!.style.color = 'white'
            submit.current!.innerText = 'Buy'
            submit.current!.style.background ='hsl(142, 76%, 34%)'
        }
        
        return ()=>{

        }
    },[isSelling])
    return authenticated? <div className='h-full px-4 py-7  min-w-minWForm flex flex-col' style={{fontFamily:'bPl'}}>
                <div className={styles.inputs}>
                    <button onClick={()=>isMarketMaker(false)} ref={buyBtn}>Buy</button>
                    <button onClick={()=>isMarketMaker(true)}ref={sellBtn}>Sell</button>
                </div>
                <div className='text-white mt-4'>
                    <span className='text-gray-200'>avbl:</span>
                  <span className='text-toxicPurple ml-2'>{Number(usdt)}</span>
                </div>
                <div className={styles.inp_wrapper}>
                    <span className='flex justify-between items-center bg-light rounded-md pr-4'>
                        <input placeholder='Price' ref={priceInput} type="number" />
                        <span className='text-gray-100'>USDT</span>
                    </span>
                    <span className='flex justify-between items-center bg-light rounded-md pr-4'>
                        <input placeholder='Amount' ref={amountInput} type="number" />
                        <span className='text-gray-100'>{coin}</span>
                    </span>
        
                    <input onChange={inpTypeRangeChangeHandler} type="range"  defaultValue={0} min={0} max={100} step={0.001}  className='h-11' />
                    
                    <input ref={totalInput}  className='h-11 w-full bg-light rounded-md p-4 text-gray-200 outline-none' placeholder='Total' type="number" />
                    
                    <button ref={submit}></button>
                </div>
        </div>
        //
        :
        <span className='text-toxicBlue text-xl flex items-center w-full h-full justify-center'>
                <span >
                    Please <Link href={'../signin'} ><span className='underline cursor-pointer'>sign in</span></Link><br/>
                    or  <Link href={'../singup'} ><span className='underline cursor-pointer'>create an account</span></Link>
                </span>
            </span>
}
export default React.memo(Form,(prev,next)=>prev.authenticated === next.authenticated && prev.draw === next.draw?true:false);