"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { useToast } from "@/components/ui/use-toast";

import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

import { columns } from "./columns";
import { useAdminState } from "@/providers/admin-provider";
import { Loader2 } from "lucide-react";
import { auth, useAuth } from "@clerk/nextjs";
import { isAdmin } from "@/lib/admin";
import { redirect, useRouter } from "next/navigation";

interface ProductsPageProps {}

interface productItem {
  id: number;
  name: string;
  category: { name: string };
  price: number;
  isOrdered?: boolean;
}

const ProductsPage: FC<ProductsPageProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { userId } = useAuth();
  const { productsDeleteData } = useAdminState();
  

  if(!isAdmin(userId)){
    redirect("/notAdmin")
    
  }

  const [data, setData] = useState([]);
  const router = useRouter();

  function handleRequestedProduct() {
    if (isAdmin(userId)) {
      router.push("/requestedProduct");
    } else {
      toast({
        title: "Only Admins can add Products",
      });
    }
  }

  async function getProducts() {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      if (response.ok) {
        const filteredProducts = data.message.map((product: productItem) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          isOrdered: product.isOrdered,
          category: product.category.name,
        }));
        setData(filteredProducts);
        console.log(filteredProducts);
      } else {
        console.log("Something went wrong");
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAddProduct(){
    if (isAdmin(userId)) {
      router.push("/products/add-product");
    } else {
      toast({
        title: "Only Admins can add Products",
      });
    }

  }

  useEffect(() => {
    getProducts();
  }, [productsDeleteData]);

  return (
    <div className="px-16 w-screen h-screen pt-5">
      <div className="w-full   flex items-center gap-3 justify-between">
        <Heading text={"Products"} />
       
        <Button onClick={handleAddProduct}> Add New Product</Button>
       
      </div>
      <hr className="mt-5" />
      {loading ? (
        <div className="mt-5 flex w-screen items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={data} />
          <Button onClick={handleRequestedProduct}>
            Add from Requested Products
          </Button>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
