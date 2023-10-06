"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns, CategoryColumn } from "./columns";


interface BillboardClientProps {
  data: CategoryColumn[];
}

export const CategoryClient = ({data} : BillboardClientProps) => {
  const params = useParams();
  const router = useRouter();

  const onAddNew = () => {
    router.push(`/${params.storeId}/categories/new`)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Categories (${data.length})`}/>
        <Button onClick={onAddNew}>
          <Plus className="mr-2 h-4 w-4"/> Add new
        </Button>
      </div>

      <Separator />
      
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};