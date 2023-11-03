"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Images {
  id: number;
  url: string;
}

interface RequestedProduct {
  id: number;
  name: string;
  images: Images[];
  description: string;
  email: string;
  phoneNo: string;
  price:string
}

export default function RequestedProductsPage() {
  const [data, setData] = useState<RequestedProduct[]>([]);
  const { toast } = useToast();
  useEffect(() => {
    async function getRequestedProducts() {
      try {
        const response = await fetch("/api/requestedProducts");
        const data = await response.json();
        if (response.ok) {
          setData(data.message);
          console.log(data);
        } else {
          toast({
            title: data.message,
          });
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    }
    getRequestedProducts();
  }, []);

  return (
    <div className="px-12 py-5 ">
      <Heading text="Requested Products" />
      <hr className="mt-5" />
      <div className="mt-5">
        {data.length > 0 ? (
          <>
            {data.map((a) => (
              <div
                key={a.id}
                className=" rounded-md border m-5 p-5 flex gap-x-5 "
              >
                {a.images.map((img) => (
                  <Image
                    className="border"
                    alt={a.name}
                    src={img.url}
                    key={img.id}
                    width={400}
                    height={300}
                  />
                ))}
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Product Name: {a.name}</p>
                  <p className="font-semibold">Price: ₹{a.price}</p>
                  <div>
                    <p className="underline underline-offset-4 uppercase  font-bold">
                      Description
                    </p>
                    <p>{a.description}</p>
                  </div>
                  <p className="flex gap-2 items-center">
                    <Mail className="h-4 w-4" />
                    {a.email}
                  </p>

                  <p className="flex gap-2 items-center">
                    <Phone className="h-4 w-4" />
                    {a.phoneNo}
                  </p>
                  
                  
                 <Link href={`/products/add-product/${a.id}`} className={buttonVariants()}>Add to Form</Link>
                  <Button variant={"secondary"}>Remove the Product</Button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No items</p>
        )}
      </div>
    </div>
  );
}
