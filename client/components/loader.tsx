
const SVGComponent = () => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{
      margin: "auto",
      marginBottom:'3px',
      display: "block",
    }}
    width="80px"
    height="30px"
    viewBox="0 50 100 10"
    preserveAspectRatio="xMidYMid"

  >
    <circle cx={30.5} cy={58} r={5} className='fill-white'>
      <animate
        attributeName="cy"
        calcMode="spline"
        keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
        repeatCount="indefinite"
        values="58;42;58;58"
        keyTimes="0;0.17500000000000002;0.35000000000000003;1"
        dur="1.0526315789473684s"
        begin="-0.368421052631579s"
      />
    </circle>
    <circle cx={43.5} cy={58} r={5} className='fill-white'>
      <animate
        attributeName="cy"
        calcMode="spline"
        keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
        repeatCount="indefinite"
        values="58;42;58;58"
        keyTimes="0;0.17500000000000002;0.35000000000000003;1"
        dur="1.0526315789473684s"
        begin="-0.2763157894736842s"
      />
    </circle>
    <circle cx={56.5} cy={58} r={5} className='fill-white'>
      <animate
        attributeName="cy"
        calcMode="spline"
        keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
        repeatCount="indefinite"
        values="58;42;58;58"
        keyTimes="0;0.17500000000000002;0.35000000000000003;1"
        dur="1.0526315789473684s"
        begin="-0.1842105263157895s"
      />
    </circle>
    <circle cx={69.5} cy={58} r={5} className='fill-white'>
      <animate
        attributeName="cy"
        calcMode="spline"
        keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
        repeatCount="indefinite"
        values="58;42;58;58"
        keyTimes="0;0.17500000000000002;0.35000000000000003;1"
        dur="1.0526315789473684s"
        begin="-0.09210526315789475s"
      />
    </circle>
  </svg>
);
export default SVGComponent;
