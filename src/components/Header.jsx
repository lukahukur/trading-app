import react from 'react';
import AvatarsFox from './../Avatars/fox.png'
import logo from './../logo.png'
function Header(props){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
   
return(
    <div className='header'>
        <div>

        <div>
            <img src={logo} alt="logo"  width={'150px'}/>
        </div>

        </div>

        <span className='Head_WRRP'>
       
        <div className='userWrapper'> 

      
        
        <div className='Money'>
        <span className='userName'>Luka Cho</span>
        <span className='sochik'>{formatter.format(props.wallet)}</span>
        </div>
        
        <img src={AvatarsFox} className='avatar'/>
        
        </div>
        <span className='TXT'>Wallet</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width='30' height='30'>
            <path fillRule="evenodd" clipRule="evenodd" d="M8 12a4 4 0 108 0 4 4 0 00-8 0zm2 0a2 2 0 104 0 2 2 0 00-4 0z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M14.693 22.083l.98-2.941.67-.388 3.04.621 2.695-4.667-2.053-2.315v-.786l2.053-2.315-2.695-4.668-3.04.622-.67-.388-.98-2.941h-5.39l-.981 2.941-.67.388-3.04-.622-2.695 4.668 2.053 2.315v.786l-2.053 2.315 2.695 4.667 3.04-.621.67.388.98 2.941h5.39zm1.306-5.44l2.373.484 1.253-2.17-1.6-1.805v-2.304l1.6-1.805-1.253-2.17-2.373.484-1.983-1.147-.765-2.293h-2.507L9.979 6.21 7.996 7.357l-2.373-.485L4.37 9.043l1.6 1.805v2.304l-1.6 1.804 1.253 2.171 2.373-.485L9.98 17.79l.765 2.293h2.507l.765-2.293 1.983-1.148z" fill="white"></path>
            
            </svg>
        </span>
           

    </div>
    );
}
export default Header;