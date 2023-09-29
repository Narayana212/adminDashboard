"use client"
import Heading from "@/components/ui/heading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { productOrders } from "@/mock/product-order";
import {DashBoardLineChart} from "@/components/dashboard-linechart";
import { isAdmin } from "@/lib/admin";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default function Home() {

  const {userId}=useAuth()

  if(!isAdmin(userId)){
    redirect("/notAdmin")
    
  }
  return (
    <div className="px-16 h-auto w-screen pt-5">
      <div className="w-full flex items-center gap-3 justify-between">
        <Heading text="Dashboard" />
      </div>
      <hr className="mt-5" />
      <div className="w-full flex pt-5 items-center flex-wrap gap-y-5 justify-evenly">
        {productOrders.map((card) => (
          <Card key={card.id} className="w-[200px] h-[100px]">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <hr className="mt-5" />
      <DashBoardLineChart />
    </div>
  );
}
