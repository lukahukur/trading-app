import React,{FC,useState,useEffect,useRef} from 'react'
import Link from 'next/link'
import { typedUseSelector } from '../store';

const Bids:FC<{authenticated:boolean}> = ({authenticated})=>{
    let font ={fontFamily:'bPl'};
    //wheter display orders or not
    const [showOrders,hideOrders] = useState<boolean>();
    const orders = typedUseSelector(state => state.dbData.orders)
    //
    const mappedArrayOFOrders = orders.map((e)=>{
        const time = new Date(e.time*1000);

        return (
            <span className='border w-full h-8 flex justify-between items-center'>
                <span className={e.side === "buy" ?"text-green-600":"text-red-500"}>{e.side.toUpperCase()}</span>
                <span className='text-toxicPurple'>{e.currency.toUpperCase()}</span>
                <span>{e.price}</span>
                <span>{e.amount}</span>

                <span>{time.getFullYear()}:{time.getMonth()}:{time.getDay()}:{time.getMinutes()}</span>
            </span>
        )
    })

    return authenticated?
            <span style={font} className="w-full flex flex-col text-textMain h-full px-3 py-2">
                
                <span className="flex flex-row h-min justify-between w-32">
                    <button className="text-toxicBlue">
                        Orders
                    </button>
                    <button>
                        History
                    </button>
                </span>
                <span className='w-full h-full border flex'>
                    {mappedArrayOFOrders}
                </span>
            </span>
            :
            <span className='text-toxicBlue text-xl flex items-center w-full h-full justify-center'>
                <span >
                    Please <Link href={'../signin'} ><span className='underline cursor-pointer'>sign in</span></Link><br/>
                    or  <Link href={'../singup'} ><span className='underline cursor-pointer'>create an account</span></Link>
                </span>
            </span>
}
export default React.memo(Bids,(prev,next)=>prev.authenticated === next.authenticated);