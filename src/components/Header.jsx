import react from 'react';
import AvatarsFox from './../Avatars/fox.png'
function Header(){

return(
    <div className='header'>
        <div>
        <div>Trading Simulator</div>
        </div>
        
        <div className='userWrapper'> 



        <div className='Money'>
        <span className='userName'>Luka Cho</span>
        <span className='sochik'>$1000000000</span>
        </div>
        
        <img src={AvatarsFox} className='avatar'/>
        
        </div>
            
           

    </div>
    );
}
export default Header;