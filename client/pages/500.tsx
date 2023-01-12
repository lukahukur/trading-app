import Link from 'next/link'

export default function FiveOfive() {
  return (
    <span className="flex flex-col w-full h-screen  items-center justify-center text-gray-300 text-3xl">
      <span>**500**</span>
      <span>Server Error</span>
      <span className="text-2xl mt-3 underline">
        <Link href={'/'}>Go Back</Link>
      </span>
    </span>
  )
}
