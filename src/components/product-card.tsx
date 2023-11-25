import { prisma } from "@/lib/prisma";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default async function ProductCard() {
  const products = prisma.product.count({});

  return (
    <Card className="w-[200px] h-[100px]">
      <CardHeader>
        <CardTitle>{products}+</CardTitle>
        <CardDescription>Products added</CardDescription>
      </CardHeader>
    </Card>
  );
}
