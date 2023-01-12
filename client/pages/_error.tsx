import Link from 'next/link'

export default function Error() {
  return (
    <span className="flex flex-col w-full h-screen  items-center justify-center text-gray-300 text-3xl">
      <span>Page Not Found</span>
      <span className="text-2xl mt-3 underline">
        <Link href={'/'}>Go Back</Link>
      </span>
    </span>
  )
}
