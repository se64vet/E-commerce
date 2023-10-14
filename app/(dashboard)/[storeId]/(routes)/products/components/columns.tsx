"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}

const toSentenceCase = (word: string) : string => {
  return word.charAt(0).toLocaleUpperCase() + word.slice(1);
}
const toYesNo = (bool : boolean) : string => {
  const resStr = bool ? 'Yes' : 'No';
  return resStr;
}
export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell : ({row}) => (<div>{toSentenceCase(row.original.name)}</div>)
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell : ({row}) => (<div>{toSentenceCase(row.original.name)}</div>)
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color }} />
      </div>
    )
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell : ({row}) => (<div>{toYesNo(row.original.isArchived)}</div>)
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell : ({row}) => (<div>{toYesNo(row.original.isFeatured)}</div>)
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
