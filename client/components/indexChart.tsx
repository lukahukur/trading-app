// import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef, useState, useLayoutEffect } from "react"
import { createChart } from "lightweight-charts"
import { mockCandlestickData, mockVolumeData } from "../api/mockData";

const ChartComponent: React.FC<{ colors: any; children: JSX.Element }> = (
  props
) => {
  const {
    colors: {
      backgroundColor = "black",
      lineColor = "#2962FF",
      textColor = "white",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    },
  } = props
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const handleResize = () => {
      chart?.applyOptions({
        width: window.innerWidth,
        height: window.innerHeight <= 800 ? 800 : window.innerHeight,
      })
    }
    var chart = createChart(chartContainerRef.current!, {
      width: window.innerWidth,
      height: window.innerHeight,
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      layout: {
        backgroundColor: "#131722",
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: {
          color: "rgba(42, 46, 57, 0.6)",
        },
        horzLines: {
          color: "rgba(42, 46, 57, 0.6)",
        },
      },
    })

    var candlestick = chart.addCandlestickSeries({
      upColor: "rgba(38,198,218, 0.56)",
      downColor: "rgba(239,83,80, 0.4)",
    })

    var volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    candlestick.setData(mockCandlestickData)

    volumeSeries.setData(mockVolumeData)

    chart.applyOptions({
      handleScroll: {
        horzTouchDrag: false,
        mouseWheel: false,
        pressedMouseMove: false,
        vertTouchDrag: false,
      },
      handleScale: {
        mouseWheel: false,
      },
    })

    chart?.timeScale().setVisibleLogicalRange({ from: 23, to: 155 })

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)

      chart?.remove()
    }
  }, [backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor])

  return (
    <>
      <div ref={chartContainerRef}></div>
      {props.children}
    </>
  )
}
export default ChartComponent
