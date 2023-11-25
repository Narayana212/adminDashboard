import { prisma } from "@/lib/prisma";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default async function RequestedCard() {
  const products = await prisma.requestedProduct.count({
    
  });
  
  return (
    <Card className="w-[200px] h-[100px]">
      <CardHeader>
        <CardTitle>{products}+</CardTitle>
        <CardDescription>New product requestes</CardDescription>
      </CardHeader>
    </Card>
  );
}
