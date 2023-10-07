"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/ui/modals/delete-modal";

import { SizeColumn } from "./columns"; 
import { SizeFormModal } from "./form-modal";
interface CellActionProps {
  data: SizeColumn;
}

export const CellAction = ({data,} : CellActionProps) => {
  
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false)

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
      toast.success('size deleted.');
      router.refresh();
      router.push(`/${params.storeId}/properties`, {scroll: true})
    } catch (error) {
      toast.error('There is a product using this size!');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('ID copied to clipboard.');
  }

  return (
    <>
      <DeleteModal 
        open={open} 
        setClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <SizeFormModal
      open = {editModalOpen}
      setClose={() => setEditModalOpen(false)}
      initialData={data}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {/* ------------------ */}
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
        {/* ------------------ */}
          <DropdownMenuItem
            onClick={() => setEditModalOpen(true)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
        {/* ------------------ */}
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};