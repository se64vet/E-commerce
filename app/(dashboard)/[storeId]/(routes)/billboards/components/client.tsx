"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns, BillboardColumn } from "./columns";


interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient = ({data} : BillboardClientProps) => {
  const params = useParams();
  const router = useRouter();

  const onAddNew = () => {
    router.push(`/${params.storeId}/billboards/new`)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" />
        <Button onClick={onAddNew}>
          <Plus className="mr-2 h-4 w-4"/> Add new
        </Button>
      </div>

      <Separator />
      
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};