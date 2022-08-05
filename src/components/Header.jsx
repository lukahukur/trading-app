import '../css/app.css'
import logo from '../icons/logo.png'
import fox from '../icons/fox.png'
export function Header(){
    return(
    <div  id='header'>
        <img width='130px'src={logo} alt="logo" />
        <div className='money_wrp'>
            <div className='money'>
                 <span>Luka Cho</span>
                 <span style={{color:'#1AB41A'}}>$100000000</span>  
             </div>
             <img id='icon_'src={fox} alt="logo" />
        </div>
    </div>
   
    )
}