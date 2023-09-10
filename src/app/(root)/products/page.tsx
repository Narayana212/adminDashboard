"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { useToast } from "@/components/ui/use-toast";
import { useAdminState } from "@/context/admin-provider";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { number } from "zod";
import { columns } from "./columns";



interface ProductsPageProps {}


interface productItem{
  id:number,
  name:string,
  category:{name:string},
  price:number,
  isOrdered?:boolean,
}




const ProductsPage: FC<ProductsPageProps> = () => {
  const [loading,setLoading]=useState<boolean>(false)
  const { toast } = useToast();
  const {productsDeletedata}=useAdminState()


  const [data,setData]=useState([])


  async function getProducts(){
    try {
      setLoading(true)
      const response=await fetch("/api/products")
      const data= await response.json()
      if(response.ok){
        const filteredProducts = data.message.map((product:productItem) => ({
          id:product.id,
          name: product.name,
          price: product.price,
          isOrdered: product.isOrdered, 
          category: product.category.name,
        }));
        setData(filteredProducts)
        console.log(filteredProducts)
      }else {
        console.log("Something went wrong");
      }
      
    } catch (error:any) {
      throw new Error(error.message);
      
    }finally{
      setLoading(false)
    }
  }



  useEffect(()=>{
    getProducts()


  },[])
  





  return (
    <div className="px-16 w-screen h-screen pt-5">
      <div className="w-full   flex items-center gap-3 justify-between">
        <Heading text={"Products"}/>
        <Link href="/products/add-product">
          <Button> Add New Product</Button>
        </Link>
      </div>
      <hr className="mt-5" />
      {loading ? (
        <div className="mt-5 flex w-screen items-center justify-center">
          <Image src="/sync.png" alt="loading" className="animate-spin" width={25} height={25}/>
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
    
  );
};

export default ProductsPage;
