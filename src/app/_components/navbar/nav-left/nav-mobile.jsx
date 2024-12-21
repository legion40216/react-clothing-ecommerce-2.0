import React from 'react'

import { usePathname } from 'next/navigation'
import { AlignJustify, Sun, X } from 'lucide-react'
import Image from 'next/image'
import { routes } from '../../navbar'

import { Button } from "@/components/ui/button"
import NavLinks from '../../nav-links'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function NavMobile() {
  const pathName = usePathname()

  // Update the active state of routes dynamically
  const updatedRoutes = routes.map(route => ({
      ...route,
      active: pathName === route.href
  }))

  return (
      <Sheet>
        <SheetTrigger asChild>
        <Button 
        variant="outline" 
        className="aspect-square p-1">
          <AlignJustify className='h-6 w-6' />
        </Button>
        </SheetTrigger>
        <SheetContent side="left" hide={true} className="p-3">
          <SheetTitle className="hidden">
            Menu
          </SheetTitle>
          
          <SheetDescription className="hidden">
            Navigation for mobile screens
          </SheetDescription>

          <div className="flex flex-col justify-between h-full">
            <div className='grid gap-3'>
              <div className='flex items-center justify-between'>
                <Image 
                  src="/assets/images/logo.svg"
                  alt="logo" 
                  width={40} 
                  height={40}
                />
                <div className='flex gap-1'>
                  <Button variant="outline" className="h-auto w-auto p-1">
                    <Sun className="h-[25px] w-[25px]" />
                  </Button>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-auto w-auto p-1">
                      <X className="h-[25px] w-[25px]" />
                    </Button>
                  </SheetTrigger>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                {updatedRoutes.map((route, index) => (
                  <NavLinks 
                    key={index} 
                    route={route}
                    className={"border-b-[2px] border-b-secondary-200"}
                  />
                ))}
              </div>
            </div>

            <div>
                <span>phone</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
  )
}
