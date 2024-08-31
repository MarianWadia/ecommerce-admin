"use client"
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function SetupPage() {
  const isOpen = useStoreModal(state => state.isOpen)
  const onOpen = useStoreModal(state => state.onOpen)
  useEffect(()=>{
    if(!isOpen){
      onOpen()
    }
  },[isOpen, onOpen])
  return (
    <main className="p-4">
      Hello Admin,
      This is a protected route😎🔒 
    </main>
  );
}
