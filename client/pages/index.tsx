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
        <div className={styles.indexContainer}>
          <p className={styles.intexContainerP}>
            Learn Market Trading Now
          </p>
          <p className={styles.intexContainerP_S}>
            It&apos;s completely free
          </p>
          <a href={'/trade/btcusdt'}>
            <button className={styles.btn_index_}>Get Started</button>
          </a>
        </div>
      </ChartComponent>
    </span>
  )
}

export default Home
