import type { NextPage, NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import GitLogo from '../public/GitHub.png'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'

const ChartComponent = dynamic(
  () => import('../components/indexChart'),
  {
    ssr: false,
  },
)
let fired = false

const Home: NextPage = () => {
  return (
    <span className={styles.index_body}>
      <span className={styles.index_top}>
        <a
          style={{ width: '32px', height: '32px' }}
          href="https://github.com/lukahukur/trading-app"
        >
          <Image
            priority
            width={32}
            height={32}
            quality={1}
            alt="github repo"
            src={GitLogo}
            style={{ cursor: 'pointer' }}
          />
        </a>
        <button>
          <Link href={'/signin'}>Sign In</Link>
        </button>
      </span>
      <ChartComponent colors={{}}>
        <div
          className="w-screen h-screen flex z-40 justify-start items-center pl-10 pb-44 absolute top-0 left-0 
                        xl:pl-40
                        
                        "
        >
          <div
            className="
           bg-opacity-0
           rounded-2xl 
           min-h-fit
           flex-initial
           z-50 
           text-white 
           text-5xl  
           w-min
            h-max
           justify-between"
          >
            <p className="mt-0 font-medium w-72 sm:w-max ">
              Learn Market Trading Now
            </p>
            <p className="text-4xl">It&apos;s completely free</p>
            <a href={'/trade/btcusdt'}>
              <button
                className="bg-sky-600 
                flex
                justify-center
                items-center
                rounded-full
                text-2xl
                w-44 
                h-14
                mt-5"
              >
                Get Started
              </button>
            </a>
          </div>
        </div>
      </ChartComponent>
    </span>
  )
}

export default Home
