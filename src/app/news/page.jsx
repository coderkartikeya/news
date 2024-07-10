'use client'
import React, { useEffect, useState } from 'react'
import Taskbar from '../components/Taskbar'
import Categories from '../components/Categories'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
    const [data,getData]=useState([]);
    const searchParam=useSearchParams();
    const [loading,setLoading]=useState(false);
    
    useEffect(()=>{
      setLoading(true);
        const func=async()=>{
            const res=await fetch(`/api/${searchParam.get('category')}`,{
                method:'GET',
                headers:{'Content-Type':'application/json'},
                
            });
            const rst=await res.json();
            
            setLoading(false);
            getData(rst.result);
        }
        func();

    },[searchParam]);

  return (
    <div className='h-screen w-screen bg-slate-200 p-6 overflow-scroll'>
        <Taskbar />
        <Categories />
        {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className=' h-full w-full'>
          {data && data.length > 0 ? (
            <div className='flex flex-col md:flex-row gap-2 p-4'>
              <div className='w-1/3  h-full  flex flex-col p-4 justify-center items-center md:gap-4'>
                {data.slice(0, Math.ceil(data.length / 3)).map((e, index) => {
                  return (
                    <div key={index} className='flex md:flex-col h-[300px] md:gap-2 bg-white p-4 justify-center items-center'>
                      <Image src={`${e.image}`} alt='news' height={200} width={200} />
                      <Link href={`#`}>
                        <h1 className='text-md font-bold'>{e.title}</h1>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className='w-2/3 h-full flex flex-col  bg-white justify-center items-center p-3'>
                {data.slice(Math.ceil(data.length / 3), Math.ceil(data.length * 2 / 3)).map((e, index) => {
                  return (
                    <div key={index} className='flex flex-col gap-2 p-4'>
                      <Image src={`${e.image}`} alt='news' height={100} width={100} />
                      <Link href={`#`}>
                        <h1 className='text-2xl font-bold'>{e.title}</h1>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className='w-1/3 bg-slate-400 h-2/3 flex flex-col p-4 justify-center items-center'>
                {data.slice(Math.ceil(data.length * 2 / 3)).map((e, index) => {
                  return (
                    <div key={index} className='flex flex-col gap-2 p-4'>
                      <Image src={`${e.image}`} alt='news' height={100} width={100} />
                      <Link href={`#`}>
                        <h1 className='text-2xl font-bold'>{e.title}</h1>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>no data</>
          )}
        </div>
      )}

    </div>
  )
}

export default page