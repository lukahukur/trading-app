import React, { useEffect, useRef } from "react"
import { NextPage } from "next"
import { typedDispatch, typedUseSelector } from "../store"
import { Time } from "../types"
import { changeTime } from "../store/market"
import styles from "../styles/Market.module.scss"
import DropSvg from "./svgDropdown"
import { Settings } from "../components/userIcon"

const ChartIntervals = () => {
  const interval = typedUseSelector((state) => state.market.time)
  const dispatch = typedDispatch()
  let intervalArraySm: Time[] = ["1m", "5m", "1h", "12h", "1w"]
  let intervalArrayFull: Time[] = [
    "1s",
    "1m",
    "3m",
    "5m",
    "15m",
    "30m",
    "1h",
    "2h",
    "4h",
    "6h",
    "8h",
    "12h",
    "1d",
    "3d",
    "1w",
    "1M",
  ]

  const IRef = useRef<HTMLSpanElement>(null)

  function clickHandler(time: Time) {
    dispatch(changeTime(time))
  }
  function clr(e: Time) {
    return interval === e ? "#26C6DA" : "white"
  }

  let intervalArraySmHTML = intervalArraySm.map((e, i) => (
    <button key={i} style={{ color: clr(e) }} onClick={() => clickHandler(e)}>
      {e}
    </button>
  ))

  let intervalArrayFullHTML = intervalArrayFull.map((e) => (
    <button key={e} style={{ color: clr(e) }} onClick={() => clickHandler(e)}>
      {e}
    </button>
  ))
  useEffect(() => {
    let display: boolean = intervalArraySm.includes(interval)

    if (!display) {
      IRef.current!.innerHTML = interval
    } else {
      IRef.current!.innerHTML = ""
    }
  }, [interval])
  return (
    <div className={styles.intervalWrapper}>
      <div className={styles.btn_wrapper}>
        <span className="items-center flex justify-around w-96">
          Time
          {intervalArraySmHTML}
          <span className={styles.d_menu}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "spaceBetween",
                width: "45px",
              }}
            >
              <span
                ref={IRef}
                className="text-sm"
                style={{ color: "#26C6DA" }}
              />
              <DropSvg color={"gray"} />
            </span>

            <span className={styles.dropDown_menu}>
              <span className={styles.gridWrapper}>
                {intervalArrayFullHTML}
              </span>
            </span>
          </span>
        </span>
      </div>
    </div>
  )
}
export default React.memo(ChartIntervals)
