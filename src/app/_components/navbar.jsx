"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import NavLeft from './navbar/nav-left'
import NavMain from './navbar/nav-main'
import NavRight from './navbar/nav-right'
import NavLinks from './nav-links'

// Export the routes constant
export const routes = [
    {
        href: `/summar`,
        label: 'Summar',
        active: false // This will be updated dynamically in the Navbar component
    },
    {
      href: `/winter`,
      label: 'Winter',
      active: false 
  },
    {
        href: `/fall`,
        label: 'Fall',
        active: false
    },
    {
        href: `/spring`,
        label: 'Spring',
        active: false
    },
    {
        href: `/newarrivals`,
        label: 'New Arrivals',
        active: false
    },
    {
        href: `/sale`,
        label: 'Sale',
        active: false
    },
]

export default function Navbar() {
  const pathName = usePathname()

  // Update the active state of routes dynamically
  const updatedRoutes = routes.map(route => ({
      ...route,
      active: pathName === route.href
  }))

  return (
    <div>
      <div className='flex items-center justify-between container mx-auto py-2 p-4'>
        <NavLeft/>

        <div className='hidden md:block'>
          <NavMain/>
        </div>
        
        <NavRight/>
      </div>
      <div className='bg-secondary'>
        <div className='hidden md:flex justify-between container mx-auto py-2 px-4'>
          {updatedRoutes.map((route, index) => ( 
            <NavLinks 
            key={index} 
            route={route}/>
          ))}
        </div>
      </div>
    </div>
  )
}
