"use client"
import React from 'react'
import NavLeft from './nav-left'
import NavMain from './nav-main'
import NavRight from './nav-right'
import NavLinks from './nav-links'
import { usePathname } from 'next/navigation'

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
    <div className='py-4 space-y-2'>
      <div className='flex items-center justify-between'>
        <NavLeft/>

        <div className='hidden md:block'>
          <NavMain/>
        </div>
        
        <NavRight/>
      </div>
      <div className='hidden  md:flex justify-between'>
        {updatedRoutes.map((route, index) => ( 
          <NavLinks 
          key={index} 
          route={route}/>
        ))}
      </div>
    </div>
  )
}
