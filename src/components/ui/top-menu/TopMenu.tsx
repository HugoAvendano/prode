'use client'


import { titleFont } from '@/config/font'
import Image from 'next/image'
import { useUIStore } from '@/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'


export const TopMenu = () => {

  const openMenu = useUIStore(state => state.openSideMenu);  
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

  }, [])


  return (
    <nav className="topmenu">
    
      
      <div>

      </div>
      
      <div className="">
        <Link
          href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>PRODE</span>
          <span > | </span>
          <span>
            <Image
              src="/logo-gif.gif"
              alt="GIF animado"
              width={25}
              height={25}
              unoptimized
              className='inline-block'
            />
          </span>
        </Link>
      </div>
      {/* Menu icon */}
      <div className="flex items-center">
        <button
          className="m-2 p-2 rounded-md transition-all"
          onClick={()=> openMenu()}
        >

          <IoMenuOutline size={30} />
        </button>
      </div>
    </nav>
  )
}