import { Button } from '@/components/ui/button'
import { AlignJustify, ShoppingBasket } from 'lucide-react'
import React from 'react'

export default function Cart() {
  return (
    <Button 
    variant="outline" 
    size="icon" 
  >
    <ShoppingBasket className='h-6 w-6' />
  </Button>
  )
}
