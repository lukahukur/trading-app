import { NextPage } from "next"
import styles from "../styles/Market.module.scss"

const DropSvg: NextPage<{ color: string }> = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24px"
    height="24px"
    fill="none"
  >
    <path d="M16 9v1.2L12 15l-4-4.8V9h8z" className="arrow" fill={color} />
  </svg>
)
export default DropSvg
