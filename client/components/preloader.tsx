import { NextPage } from "next"
import React from "react"

const Preloader: NextPage<{ firstColor: string; secondColor: string }> = ({
  firstColor,
  secondColor,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: "transparent", display: "block" }}
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(180 50 50)">
        <rect x="15" y="15" width="10" height="40" fill={firstColor}>
          <animate
            attributeName="height"
            values="50;70;30;50"
            keyTimes="0;0.33;0.66;1"
            dur="1s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.4s"
          />
        </rect>
        <rect x="35" y="15" width="10" height="40" fill={secondColor}>
          <animate
            attributeName="height"
            values="50;70;30;50"
            keyTimes="0;0.33;0.66;1"
            dur="1s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.2s"
          />
        </rect>
        <rect x="55" y="15" width="10" height="40" fill={firstColor}>
          <animate
            attributeName="height"
            values="50;70;30;50"
            keyTimes="0;0.33;0.66;1"
            dur="1s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.6s"
          />
        </rect>
        <rect x="75" y="15" width="10" height="40" fill={secondColor}>
          <animate
            attributeName="height"
            values="50;70;30;50"
            keyTimes="0;0.33;0.66;1"
            dur="1s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-1s"
          />
        </rect>
      </g>
    </svg>
  )
}
export default React.memo(Preloader)
