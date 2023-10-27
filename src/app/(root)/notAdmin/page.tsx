"use client";
import Heading from '@/components/ui/heading'

import { useAuth } from '@clerk/nextjs';
import React from 'react'

export default function NotAdmin() {
  const { userId } = useAuth();
  return (
    <div className='w-screen h-screen flex justify-center items-center -mt-24'>
        <Heading text='Your Not Admin'/>
        <p>{userId}</p>
    </div>
  )
}
