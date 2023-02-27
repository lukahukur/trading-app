import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { typedDispatch, typedUseSelector } from '../store'
import { useGetLoggedInMutation } from '../store/_api'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '../components/svg-s/loader'

String.prototype.containsNumber = function () {
  let arrOfStr: string[] = this.split('')

  if (arrOfStr.find((e) => Number.isInteger(Number(e)))) {
    return true
  }

  return false
}

export default function Signin() {
  const [Login, { data, error, isLoading }] = useGetLoggedInMutation()
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string>('')
  const messageBox = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (data) {
      localStorage.setItem('access', data.access)

      window.location.href = '/trade/btcusdt'
    } else if (error) {
      messageBox.current!.style!.display = 'flex'

      switch ((error as any).statusCode) {
        case 403:
          setMessage('incorrect email or password')
          break
        case 429:
          setMessage('too many requests, wait some time')
          break
        default:
          setMessage('Error')
      }
    }
  }, [data, error])

  async function submit() {
    const mailVal = email.current!.value
    const passwordVal = password.current!.value

    if (!mailVal || !passwordVal) {
      messageBox.current!.style!.display = 'flex'

      setMessage('not enougn information')
    } else if (
      passwordVal!.length < 8 ||
      passwordVal!.containsNumber() === false
    ) {
      messageBox.current!.style!.display = 'flex'

      setMessage(
        "pass is shorter than 8 characters or it doesn't contain the numbers",
      )
    } else {
      Login({ email: mailVal, password: passwordVal })
    }
  }

  return (
    <div className=" h-screen flex items-center justify-center">
      <div className={styles.reg_form_wrapper}>
        <div className={styles.reg_sign_up}>Sign In</div>
        <div className={styles.reg_form} style={{ height: '300px' }}>
          <label htmlFor="email">email</label>
          <input
            autoComplete="off"
            ref={email}
            type="email"
            name="email"
          />
          <label
            htmlFor="password"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>password</span>
            <span className="hover:underline cursor-pointer">
              <Link href={'/'}>forgot password?</Link>
            </span>
          </label>
          <input ref={password} type="password" name="password" />
          <span>
            {
              <button
                onClick={submit}
                className={styles.reg_form_button}
              >
                {isLoading ? <Loader /> : <>Sign In</>}
              </button>
            }
          </span>
          <p>
            <Link href={'/signup'}>New to us? Register</Link>
          </p>
        </div>
        <span
          ref={messageBox}
          style={{ display: 'none' }}
          className="items-center justify-center text-red-600 w-80 h-10 mt-3 "
        >
          {message}
        </span>
      </div>
    </div>
  )
}
