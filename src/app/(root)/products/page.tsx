"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ProductsPageProps {}

const FormSchema = z.object({
  color: z.string(),
  size: z.string(),
  category: z.string(),
  price: z.number().positive("Value must be a positive number"),
  description:z.string().min(10,"Description must be more than 10 characters").max(50,"Description must be more than 50 characters")
});

interface Item {
  id: number;
  name: string;
}

const ProductsPage: FC<ProductsPageProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [categoryData, setCategoryData] = useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }


  async function getCategoryData() {
    try {
      setLoading(true);
      const response = await fetch("api/category");
      const data = await response.json();
      if (response.ok) {
        setCategoryData(data.message);
      } else {
        console.log("Error");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
    setLoading(false)
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category for your product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryData.map((size: Item) => (
                        <SelectItem key={size.id} value={size.name}>
                          {size.name}
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
                        field.onChange(parseFloat(e.target.value)); // Parse the string input to a number
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea/>
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

export default ProductsPage;
