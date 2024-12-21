import { Button } from '@/components/ui/button'
import { AlignJustify, ShoppingBasket } from 'lucide-react'
import React from 'react'

export default function Cart() {
  return (
  <Button 
  variant="outline" 
  className="aspect-square p-1">
    <ShoppingBasket className='h-7 w-7' />
  </Button>
  )
}
