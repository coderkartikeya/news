import React from 'react'
import Link from 'next/link'

const Categories = () => {
  return (
    <div className='flex p-4 md:p-10 justify-between overflow-scroll no-scrollbar gap-4 md:gap-0' style={{ scrollbarWidth: 0 }}>
        <Link href={{
            pathname:'/news',
            query:{category:'sports'}
        }}>
        <h1 className='text-lg md:text-2xl p-1 md:p-3 bg-black text-white rounded-md'>Cricket</h1>
        </Link>
        <Link href={{
            pathname:'/news',
            query:{category:'allsports'}
        }}>
        <h1 className='text-lg md:text-2xl p-1 md:p-3 bg-black text-white rounded-md'>AllSports</h1>
        </Link>
        <Link href={`#`}>
        <h1 className='text-lg md:text-2xl p-1 md:p-3 bg-black text-white rounded-md'>National</h1>
        </Link>        
        <Link href={`#`}>
        <h1 className='text-lg md:text-2xl p-1 md:p-3 bg-black text-white rounded-md'>International</h1>
        </Link>
        <Link href={`#`}>
        <h1 className='text-lg md:text-2xl p-1 md:p-3 bg-black text-white rounded-md'>Cricket</h1>
        </Link>
    </div>
  )
}

export default Categories