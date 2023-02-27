import { useEffect, useRef } from 'react'
import { typedUseSelector } from '../../../store'

let fired = false
export default function Failure() {
  const isError = typedUseSelector((s) => s.popupSlice.exception)
  let popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isError && !fired) {
      fired = true

      popupRef.current?.classList.remove('-top-10')
      popupRef.current?.classList.add('top-5')

      // don't want user to create million timeouts
      setTimeout(() => {
        fired = false
        popupRef.current?.classList.remove('top-5')
        popupRef.current?.classList.add('-top-10')
      }, 2000)
    }
  }, [isError])
  return (
    <div
      ref={popupRef}
      className="absolute bg-red-500 bg-opacity-80 w-fit h-10 flex items-center -top-10
                 z-50 left-1/2 -translate-x-1/2 p-2 rounded-full transition-all justify-between"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 16 16"
        className="fill-black"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
      </svg>
      <span className="w-fit flex justify-center items-center">
        <h3 className="font-semibold text-black ml-2 text-lg ">
          {isError?.message}
        </h3>
      </span>
    </div>
  )
}
