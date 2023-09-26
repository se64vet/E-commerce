'use client'; 

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";

import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {

  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)

  useEffect(() => {
    if(!isOpen){
      onOpen();
    }
  
  }, [isOpen, onOpen])
  
  return null;
}
