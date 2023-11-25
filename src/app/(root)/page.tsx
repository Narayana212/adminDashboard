import Heading from "@/components/ui/heading";
import { isAdmin } from "@/lib/admin";
import { auth} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProductCard from "@/components/product-card";
import OrderCard from "@/components/order-card";
import RequestedCard from "@/components/requested-card";
import SalesCard from "@/components/revene-card";


export default function Home() {

  const { userId } = auth();

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
        
          <ProductCard/>
          <OrderCard/>
          <RequestedCard/>
          <SalesCard/>

      
      </div>
    </div>
  );
}
