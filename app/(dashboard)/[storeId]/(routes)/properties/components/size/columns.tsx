"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type SizeColumn = {
  id: string;
  name: string;
  value: string
  createdAt: string;
}
const toSentenceCase = (str : string) : string => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}
export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell : ({row}) => (<div>{row.original.name.toUpperCase()}</div>)
  },
  {
    accessorKey: "value",
    header: "Description",
    cell : ({row}) => (<div>{toSentenceCase(row.original.value)}</div>)
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