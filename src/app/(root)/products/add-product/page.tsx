"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import test from "node:test";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ProductsAddingPageProps {}

const testProductValues = [
  {
    id: 1,
    price: 10,
    description: "This is a test product description.",
    name: "Test Product",
    images: [
      {
        url: "https://res.cloudinary.com/diynkxbpc/image/upload/v1695474409/jvzulobllxphluvwcqpg.jpg",
      },
      {
        url: "https://res.cloudinary.com/diynkxbpc/image/upload/v1695474409/jvzulobllxphluvwcqpg.jpg",
      },
      
    ],
    phone:9912345900

  },
  {
    id: 2,
    price: 30,
    description: "This is a 2nd test product description.",
    name: "2nd Test Product",
    images: [
      {
        url: "https://res.cloudinary.com/diynkxbpc/image/upload/v1695474409/jvzulobllxphluvwcqpg.jpg",
      },
    ],
  },
  {
    id: 3,
    price: 30,
    description: "This is a 3rd test product description.",
    name: "2nd Test Product",
    images: [
      {
        url: "https://res.cloudinary.com/diynkxbpc/image/upload/v1695474409/jvzulobllxphluvwcqpg.jpg",
      },
    ],
  },
  {
    id: 4,
    price: 30,
    description: "This is a 4th test product description.",
    name: "2nd Test Product",
    images: [
      {
        url: "https://res.cloudinary.com/diynkxbpc/image/upload/v1695474409/jvzulobllxphluvwcqpg.jpg",
      },
    ],
  }
];

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
});

interface Item {
  id: number;
  name: string;
}

const defaultValues = {
  categoryId: "",
  price: 0,
  description: "",
  name: "",
  images: [],
};

const ProductsAddingPage: FC<ProductsAddingPageProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [categoryData, setCategoryData] = useState<Item[]>([]);

  async function addTestProduct(id: number) {
    form.reset(testProductValues[id - 1]);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(productData: z.infer<typeof FormSchema>) {
    try {
      setSubmitLoading(true);
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

  useEffect(() => {
    getCategoryData();
  }, []);

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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
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
                    <Input {...field} />
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
                      value={field.value.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>

            <Sheet>
              <SheetTrigger>
                <Button type="button" className="ml-5" variant={"secondary"}>
                  Add Requested Product
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Requested Products List</SheetTitle>

                  <div>
                    <ScrollArea  className="h-[120vh] flex flex-col gap-2">
                      {testProductValues.map((testProduct) => (
                        <Card key={testProduct.id} className="m-2">
                          <CardHeader>
                            <CardTitle>{testProduct.name}</CardTitle>
                            <div className="flex gap-2">
                              {testProduct.images.map((image) => (
                                <Image
                                  key={testProduct.id}
                                  src={image.url}
                                  width={"50"}
                                  alt={"test"}
                                  height={"50"}
                                />
                              ))}
                            </div>
                          </CardHeader>
                          <CardContent>{testProduct.description}</CardContent>
                          <CardFooter>
                            <Button
                              onClick={() => addTestProduct(testProduct.id)}
                              variant={"outline"}
                            >
                              Add to Form
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </ScrollArea>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ProductsAddingPage;
