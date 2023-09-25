"use client"

import { useToast } from '@/components/ui/use-toast';
import React, { useEffect } from 'react';

export default function RequestedProductsPage() {
    const {toast}=useToast()
  useEffect(() => {
    async function getRequestedProducts() {
      try {
        const response = await fetch("/api/requestedProducts");
        const data=await response.json();
        if(response.ok){
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
    </div>
  );
}
