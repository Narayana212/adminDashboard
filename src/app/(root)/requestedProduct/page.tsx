"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { useToast } from "@/components/ui/use-toast";
import {
  ChevronLeft,
  ChevronRight,
  Divide,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

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
  price: string;
  categoryId?: any;
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="absolute top-52 -right-7 cursor-pointer">
      <ChevronRight className="text-black" size={"20px"} />
    </div>
  );
};
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="absolute top-52 -left-7 cursor-pointer">
      <ChevronLeft className="text-black" size={"20px"} />
    </div>
  );
};

interface Item {
  id: number;
  name: string;
}

export default function RequestedProductsPage() {
  const [data, setData] = useState<RequestedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryId, setcategoryId] = useState(null);
  const router = useRouter();

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [categoryData, setCategoryData] = useState<Item[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  var settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplaySpeed: 1000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    async function getRequestedProducts() {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
    getRequestedProducts();
  }, []);

  async function removeProduct(id: any) {
    try {
      setDeleteLoading(true);
      const response = await fetch(`api/requestedProducts/${id}`, {
        method: "Delete",
      });
      const data = await response.json();
      if (response.ok) {
        setData(data.message);

        toast({
          title: "Deleted Successfully",
        });
        router.refresh();
      } else {
        const data = await response.json();
        toast({
          title: data.message,
        });
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setDeleteLoading(false);
    }
  }

  async function getCategoryData() {
    try {
      setLoading(true);
      const response = await fetch("/api/category");
      const data = await response.json();
      if (response.ok) {
        setCategoryData(data.message);
      } else {
        console.log(data);
      }
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Something Went Wrong Please Try Again",
      });
    }
    setLoading(false);
  }

  const handleSelectChange = (event: any) => {
    const value = event.target.value;
    setcategoryId(value);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  async function addtheProduct(id: any) {
    try {
      setSubmitLoading(true);
      let productData = data.filter((data) => data.id == id);

      productData = productData.map((product) => ({
        ...product,
        // @ts-ignore
        categoryId: categoryId.toString(),
      }));
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(productData[0]),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: "Product Added successfully",
        });

        router.push("/products");
      } else {
        toast({
          title: "Something went wrong",
        });
      }
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Something Went Wrong Please Try Again",
      });
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <div className="px-12 py-5 ">
      <Heading text="Requested Products" />
      <hr className="mt-5" />
      <div className="mt-5">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : data.length > 0 ? (
          <>
            {data.map((a) => (
              <div
                key={a.id}
                className=" rounded-md border m-5 p-5 flex flex-col md:flex-row gap-10 "
              >
                <div className="w-72">
                  <Slider {...settings}>
                    {a.images.map((img) => (
                      <div
                        className="flex justify-center items-center"
                        key={img.id}
                      >
                        <Image
                          alt={a.name}
                          src={img.url}
                          width={300}
                          height={200}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Product Name: {a.name}</p>
                  <p className="font-semibold">Price: ₹{a.price}</p>
                  <div>
                    <p className="underline underline-offset-4  font-semibold">
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

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>Add the Product</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <select
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            onChange={handleSelectChange}
                            value={categoryId ?? ""}
                          >
                            <option value="" disabled hidden>
                              Select Category for the Product
                            </option>
                            {categoryData.map((category) => (
                              <option
                                key={category.id}
                                value={category.id.toString()}
                              >
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={()=>setcategoryId(null)}>Cancel</AlertDialogCancel>
                        <Button onClick={() => addtheProduct(a.id)}>
                        {submitLoading ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="animate-spin" />
                              <p>Please Wait</p>
                            </div>
                          ) : (
                            "Add the Product"
                          )}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"secondary"}>Remove the Product</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the product from servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          variant={"destructive"}
                          onClick={() => removeProduct(a.id)}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="animate-spin" />
                              <p>Please Wait</p>
                            </div>
                          ) : (
                            "Remove the Product"
                          )}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
