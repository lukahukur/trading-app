import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useCreateAccountMutation } from '../store/_api'
import * as Router from 'next/router'

export default function Signup() {
  const [create, { data, error, isError, isSuccess }] =
    useCreateAccountMutation()
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const [getError, setError] = useState('')
  const [getSuccessMessage, setSuccessMessage] = useState('')
  const router = Router.useRouter()

  useEffect(() => {
    if (error) {
      switch ((error as any).status) {
        case 400:
          setError('bad request')
          break
        case 409:
          setError('user already exists')
          break
      }
    }
    if (isSuccess) {
      setError('')
      setSuccessMessage('you are successfuly registered')
      router.push('/signin')
    }
  }, [data, error, isSuccess])

  function submit() {
    if (password.current!.value.length < 8)
      return setError('password should be 8 characters long +')
    if (username.current!.value.length < 4)
      return setError('username should be at least 4 characters long')

    create({
      email: email.current!.value,
      password: password.current!.value,
      username: username.current!.value,
    })
  }

  return (
    <span className="flex justify-around items-center flex-col h-screen">
      <span className="flex w-min h-min flex-col justify-around">
        <div className={styles.reg_form_wrapper}>
          <div className={styles.reg_sign_up}>Sign Up</div>
          <div className={styles.reg_form}>
            <label htmlFor="username">username</label>
            <input
              ref={username}
              autoComplete="off"
              type="text"
              name="username"
            />
            <label htmlFor="email">email</label>
            <input
              ref={email}
              autoComplete="off"
              type="email"
              name="email"
            />
            <label htmlFor="password">password</label>
            <input ref={password} type="password" name="password" />
            <span>
              <button
                onClick={() => submit()}
                className={styles.reg_form_button}
              >
                Register
              </button>
            </span>
            <p>
              <Link href={'/signin'}>already have an account?</Link>
            </p>
          </div>
        </div>
        {getError && (
          <span className="flex items-center justify-center text-red-600 w-80 h-10 mt-3 ">
            {getError}
          </span>
        )}

        {getSuccessMessage && (
          <span className="flex items-center justify-center text-green-500 w-80 h-10 mt-3">
            {getSuccessMessage}
          </span>
        )}
      </span>
    </span>
  )
}
