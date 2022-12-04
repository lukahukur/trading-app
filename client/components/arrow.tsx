import { NextPage } from "next";

const Arrow:NextPage<{isBigger:boolean | 'hide'}> = ({isBigger}) => (
  <svg
    width="20px"
    height="20px"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill='none'
    className="arrow-icon status-buy css-3kwgah"
    style={isBigger ==='hide'?{display:'none'}:isBigger?{
      transform: "rotate(360deg)",
    }:
    {
        transform: "rotate(180deg)",
    }
}
  >
    <path
      d="M5 13.47l1.41-1.41 5.1 5.1V3h1.99v14.15l5.09-5.09L20 13.47l-7.5 7.5-7.5-7.5z"
      fill={isBigger?'red':'green'}
    />
  </svg>
);
export default Arrow;