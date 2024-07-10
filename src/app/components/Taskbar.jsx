import Link from 'next/link'
import React from 'react'

const Taskbar = () => {
  return (
    <div className='bg-white md:h-[70px] m-2  h-[50px] flex justify-between items-center px-4 md:px-8 rounded-md'>
        <h1 className='text-xl md:text-3xl'>Latest News...</h1>
        <Link href={`#`}>
        <h1 className='text-xl md:text-2xl p-1 md:pd-3 hover:bg-sky-100'>About me</h1>
        </Link>
    </div>
  )
}

export default Taskbar