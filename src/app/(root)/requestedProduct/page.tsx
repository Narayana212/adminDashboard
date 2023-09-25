"use client"

import { useToast } from '@/components/ui/use-toast';
import React, { useEffect, useState } from 'react';

interface RequestedProduct{
  id:number,
  name:string
}


export default function RequestedProductsPage() {

  const [data,setData]=useState<RequestedProduct[]>([])
    const {toast}=useToast()
  useEffect(() => {
    async function getRequestedProducts() {
      try {
        const response = await fetch("/api/requestedProducts");
        const data=await response.json();
        if(response.ok){
          setData(data.message)
            console.log(data)
        }else{
            toast({
                title:data.message
            })
        }
      } catch (error:any) {
        console.error("Error fetching data:", error.message);
      }
    }
    getRequestedProducts();
  }); 

  return (
    <div className='px-5 py-4'>
      <h1>Requested Products List</h1>
      <div>
        {data.length>0 ? <>
          {data.map((a)=>(
          <p key={a.id}>{a.name}</p>
        ))}</>:(<p>No items</p>)}
      </div>
    </div>
  );
}
