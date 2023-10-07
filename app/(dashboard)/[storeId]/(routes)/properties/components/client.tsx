'use client'

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ColorFormModal } from "./color/form-modal";
import { SizeFormModal } from "./size/form-modal";
import { columns as colorColumns,ColorColumn } from "./color/columns";
import { columns as sizesColumns, SizeColumn } from "./size/columns";
import { useColorModal, useSizeModal } from "@/hooks/use-properties-modal";

interface PropertiesClientProps {
  colors : ColorColumn[]
  sizes : SizeColumn[]
}
export const PropertiesClient = ({colors, sizes} : PropertiesClientProps) => {
  // modal trigger states
  const colorModal = useColorModal();
  const sizeModal = useSizeModal();

  return (
    <>
      <ColorFormModal
      open={colorModal.isOpen}
      setClose={colorModal.onClose} 
      initialData={null}/>

      <SizeFormModal
      open={sizeModal.isOpen}
      setClose={sizeModal.onClose} 
      initialData={null}
      />

      <div className="flex items-center justify-between">
        <Heading title={`Properties`} description="Manage sizes & colors"/>
      </div>

      <Separator />

      <div className="w-3/4 mx-auto">
        <div className="flex items-center justify-between my-2">
          <h3 className='text-2xl font-bold'>Sizes</h3>
          <Button onClick={sizeModal.onOpen}>
            <Plus className="mr-2 h-4 w-4"/> Add new
          </Button>
        </div>
        <Separator />
        <DataTable searchKey='name' columns={sizesColumns} data={sizes}/>
      </div>

      <Separator/>
      
      <div className="w-3/4 mx-auto">
        <div className="flex items-center justify-between my-2">
          <h3 className='text-2xl font-bold'>Colors</h3>
          <Button onClick={colorModal.onOpen}>
            <Plus className="mr-2 h-4 w-4"/> Add new
          </Button>
        </div>
        <Separator />
        <DataTable searchKey='name' columns={colorColumns} data={colors}/>
      </div>
    </>
  )
}
