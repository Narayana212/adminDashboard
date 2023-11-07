"use client";
import Heading from '@/components/ui/heading'

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

export default function NotAdmin() {
  const { userId } = useAuth();
  return (
    <div className='w-screen h-screen  flex-col flex justify-center items-center -mt-24'>
        <Heading text='Your Not Admin'/>
        <h1 className='mt-3'>Contact <Link href="/" className='hover:text-blue-500 font-semibold'> lr888@snu.edu.in </Link>  for Admin Access</h1>
    </div>
  )
}
