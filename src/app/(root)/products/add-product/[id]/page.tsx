"use client";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ProductsAddingPageProps {}

const FormSchema = z.object({
  categoryId: z.string(),
  price: z.number().positive("Value must be a positive number"),
  description: z
    .string()
    .min(10, "Description must be more than 10 characters")
    .max(100, "Description must be less than 100 characters"),
  name: z
    .string()
    .min(3, "Product Name must be at least 3 characters")
    .max(20, "Product Name must be less than 20 characters"),
  images: z.object({ url: z.string() }).array(),
  phoneNo: z.string(),
  email: z.string(),
});

interface Item {
  id: number;
  name: string;
}

const ProductsAddingPage: FC<ProductsAddingPageProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState({
    categoryId: "",
    price: 0,
    description: "",
    name: "",
    images: [],
    phoneNo:"",
    email:"",
  });
  const { toast } = useToast();
  const [categoryData, setCategoryData] = useState<Item[]>([]);
  const { id } = useParams();

  async function onSubmit(productData: z.infer<typeof FormSchema>) {
    try {
      setSubmitLoading(true);
      console.log(productData)
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Product Added successfully",
        });

        router.push("/products");
      } else {
        toast({
          title: data.message,
        });
      }
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Something Went Wrong Please Try Again",
      });
    } finally {
      setSubmitLoading(false);
      form.reset();
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

  async function getRequestedProductData(id: any) {
    try {
      const intId = parseInt(id);
      const response = await fetch(`/api/requestedProducts/${intId}`);
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Product retrieved Successfully",
        });
        setDefaultValues({
          categoryId: "",
          price: data.message.price,
          description: data.message.description,
          name: data.message.name,
          images: data.message.images,
          email: data.message.email,
          phoneNo: data.message.phoneNo
        });
        console.log(data.message)
        
        
      } else {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

 

  

  useEffect(() => {
    getCategoryData();
    getRequestedProductData(id);
  }, []);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  return (
    <div className="w-screen flex items-center justify-center mt-5">
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
             <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input  {...field}  value={defaultValues.email}  />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  
                  {...field}
                  value={defaultValues.phoneNo}
                 
                />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category for your product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryData.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={defaultValues.price} 
                      onChange={(e) => {
                        field.onChange(parseFloat(e.target.value));
                      }}
                      placeholder="in Rupees"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Product</FormLabel>
                  <FormControl>
                    <Input {...field} value={defaultValues.name} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    
                    <ImageUpload
                    // @ts-ignore
                      value={defaultValues.images.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) =>
                        field.onChange([...defaultValues.images, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...defaultValues.images.filter(
                            // @ts-ignore
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={defaultValues.description} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ProductsAddingPage;
