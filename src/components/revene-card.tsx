import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { prisma } from '@/lib/prisma';

export default async function SalesCard() {
    const result = await prisma.product.aggregate({
        _sum: {
          price: true,
        },
        where:{
            isOrdered:true
        }
      });
    

      console.log(result);
  return (
    <Card className="w-[200px] h-[100px]">
    <CardHeader>
      <CardTitle>₹{result._sum.price?result._sum.price:0}+</CardTitle>
      <CardDescription>Valued products ordered</CardDescription>
    </CardHeader>
  </Card>
  )
}
