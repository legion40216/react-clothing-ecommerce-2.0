"use client"
import Link from 'next/link'
import React from 'react'

import { usePathname } from 'next/navigation'
import NavLinks from './nav-links'
import { Button } from '@/components/ui/button'
import { routes } from './navbar'

export default function Footer() {
    const pathName = usePathname()

    // Update the active state of routes dynamically
    const updatedRoutes = routes.map(route => ({
        ...route,
        active: pathName === route.href
    }))

  return (
<div className="grid gap-10 place-content-center place-items-center 
md:grid-cols-[auto_1fr_auto] md:gap-4"
>
    <div className='flex flex-col justify-between items-center md:items-start h-full'>
        <Link 
        href={'#'} 
        className='text-lg font-bold'
        >
        Brandname
        </Link>
        <ul className='flex'>
            <li>
                Icon
            </li>
            <li>
                Icon
            </li>
            <li>
                Icon
            </li>
            <li>
                Icon
            </li>
        </ul>
    </div>
 

    <div>
        <nav>
            <ul className='grid grid-cols-2 gap-2 place-items-center'>
                {updatedRoutes.map((route, index) => (
                <li key={index} >
                    <NavLinks 
                    route={route}
                    className={"text-sm"}
                    />
                 </li>
                ))}
            </ul>
        </nav>
    </div>

    <div className='flex flex-col justify-between items-center md:items-start h-full'>
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <label htmlFor="newsletter">
            <input 
            type="email" 
            name="" 
            id="newsletter" 
            placeholder='Sign up for Newsletter'
            />
            </label>
            <Button type="submit">
                Go
            </Button>
        </form>

        <p className="text-xs ">Copyright 2020. All Right Reserved</p>
    </div>           
</div>
  )
}
