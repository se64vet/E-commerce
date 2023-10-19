'use client'

import { SignIn } from "@clerk/nextjs";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
 
export default function Page() {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(()=>{
      setIsMounted(true)
  },[])

  if(!isMounted)
      return null;
    
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('copied!');
  }
  
  return(
    <div className="flex flex-col">
      <SignIn />;
      <div className="bg-white text-black px-8 py-2 rounded-xl mx-7">
        <h3 className="text-2xl font-bold">Sample User</h3>
        <div className="flex flex-row justify-start items-center">
          <div >
            <span className="text-muted-foreground">Username: </span>
            <span className="italic">lukasvm</span>
          </div>
          
          <div 
          className="w-max ml-2 px-3 py-1  hover:bg-gray-200 hover:text-gray-600 rounded-md cursor-pointer"
          onClick={() => onCopy("lukasvm")}
          >
             <Copy className="inline-block h-4 w-4"/>  
          </div>
          </div>

        <div className="flex flex-row justify-start items-center">
          <div>
            <span className="text-muted-foreground">Password: </span>
            <span className="italic">ecommerce-admin</span>
          </div>

          <div 
          className="w-max ml-2 px-3 py-1  hover:bg-gray-200 hover:text-gray-600 rounded-md cursor-pointer"
          onClick={() => onCopy("ecommerce-admin")}
          >
            <Copy className="inline-block h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  ) 

}