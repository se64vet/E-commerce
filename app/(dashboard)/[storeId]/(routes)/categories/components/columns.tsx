"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type CategoryColumn = {
  id: string;
  name: string;
  createdAt: string;
  billboard: string;
}
const toSentenceCase = (str : string) : string => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell : ({row}) => (<div>{toSentenceCase(row.original.name)}</div>)
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell : ({row}) => (<div>{toSentenceCase(row.original.billboard)}</div>)
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