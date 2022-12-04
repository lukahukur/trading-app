import React,{FC} from 'react'
import { tailwindTheme, Tcoins } from '../types'
import { typedUseSelector } from '../store'
import config from '../tailwind.config'
import styles from '../styles/data.module.scss'

const themeTailwind:tailwindTheme  = config.theme!.extend!.colors as any;

const Wallet:FC<{authenticated:boolean}> = ({authenticated})=>{
    const coins = typedUseSelector(store => store.dbData.wallet);

    function coinsMap(c:any){
        let nodes = [];
        for(let elem in c){
                nodes.push([elem,c[elem]])
        }
        return nodes.map((e,i)=>{
            return  <li key={i} className='flex justify-between h-12 items-center '>
                        <span className={e[0] ==='usdt'?'text-green-600':'text-zinc-300'} >{e[0].toUpperCase()}</span>
                        <span>{Number(e[1])}</span>
                    </li>
        })
    }

    return authenticated?
            (<span style={{fontFamily:'bPl'}} className='text-gray-200 p-4 flex flex-col w-full h-full'>
                <span className='flex justify-between'>
                    <span >Wallet</span>
                    <button className='text-toxicBlue'>Log out</button>
                </span>
                <ul className={styles.coins}>{coinsMap(coins)}</ul>
            </span>):
            (<></>)
}
export default React.memo(Wallet,(prev,next)=>prev.authenticated === next.authenticated);