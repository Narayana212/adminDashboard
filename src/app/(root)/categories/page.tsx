"use client";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";
import Heading from "@/components/ui/heading";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAdminState } from "@/context/admin-provider";
import Image from "next/image";

interface CategoryPageProps {}

const formSchema = z.object({
  category: z.string().min(3, {
    message: "Category must be at least 3 characters.",
  }),
});

interface categoryItem {
  id: number;
  name: string;
  created_at: string;
}

const CategoriesPage: FC<CategoryPageProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const {categoryDeleteData,setCategoryDeleteData}=useAdminState()

  const [data, setData] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("api/category", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        const mappingData = data.message.map((item: categoryItem) => {
          const shortenedText = item.created_at.slice(0, 10);
          return { id: item.id, name: item.name, created_at: shortenedText };
        });
        toast({
          title: "Saved Successfully",
        });
        setData(mappingData);
        values.category=""
      } else {
        console.log("Something went wrong");
      }
      setLoading(false);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function getData() {
    try {
      setLoading(true);
      const response = await fetch("api/category");
      const data = await response.json();
      if (response.ok) {
        const mappingData = data.message.map((item: categoryItem) => {
          const shortenedText = item.created_at.slice(0, 10);
          return { id: item.id, name: item.name, created_at: shortenedText };
        });
        setData(mappingData);
        form.reset({
          category: ""
        });
      } else {
        console.log("Something went wrong");
      }
      
      
    } catch (error: any) {
      throw new Error(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [categoryDeleteData]);

  return (
    <div className="px-16 w-screen h-screen pt-5">
      <div className="w-full flex items-center justify-between">
        <Heading text="Categories" />
        <AlertModal button={"Add New Category"} title={"Add New Category"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-center gap-3">
                      <FormControl>
                        <Input placeholder="Enter category here..." {...field} />
                      </FormControl>
                      <Button type="submit" variant={"outline"}>
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </div>
                    <FormMessage className="self-end justify-end" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </AlertModal>
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

export default CategoriesPage;
