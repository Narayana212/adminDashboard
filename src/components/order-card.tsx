import { prisma } from "@/lib/prisma";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default async function OrderCard() {
  const products = prisma.product.count({
    where:{
        isOrdered:true
    }
  });

  return (
    <Card className="w-[200px] h-[100px]">
      <CardHeader>
        <CardTitle>{products}+</CardTitle>
        <CardDescription>Orders Placed</CardDescription>
      </CardHeader>
    </Card>
  );
}
