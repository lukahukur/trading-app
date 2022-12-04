import styles from '../styles/Home.module.scss'
import Link from 'next/link';

export default function Signup(){
  return (
    <div  className={styles.reg_form_wrapper}>
        <div className={styles.reg_sign_up}>
          Sign Up
        </div>
        <div className={styles.reg_form}>
            <label htmlFor="username">username</label>
            <input autoComplete="off" type="text" name='username' />
            <label  htmlFor="email">email</label>
            <input autoComplete="off" type="email" name='email'/>
            <label htmlFor="password">password</label>
            <input type="password" name='password'/>
            <span><button className={styles.reg_form_button}>Register</button></span>
            <p><Link href={'/signin'}>already have an account?</Link></p>
        </div>
    </div> 
  )
}
