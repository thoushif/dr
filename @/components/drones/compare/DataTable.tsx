"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [showHighlightedRows, setShowHighlightedRows] = useState(false); // Step 1
  const handleShowHighlightedRowsChange = () => {
    setShowHighlightedRows(!showHighlightedRows); // Step 2
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,

    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      getRowStyles: (row: {
        original: {
          drone0: any;
          drone1: any;

          isHeader: boolean;
        };
      }) => {
        let style: React.CSSProperties = {};
        const isDifferent =
          row.original.drone1 && row.original.drone0 !== row.original.drone1;
        const isHeader = row.original.isHeader;
        if (isDifferent && !showHighlightedRows) {
          style.backgroundColor = "rgb(226 232 240)";
        }

        // Add font bold if isHeader is true
        if (isHeader) {
          style.fontWeight = "bold";
          style.fontSize = "120%";
        }

        return style;
      },
    },
  });

  return (
    <>
      <div className="flex items-center justify-end ">
        <Label className="mr-2 text-lg align-middle text-slate-700">
          Differences only
        </Label>
        <Input
          type="checkbox"
          checked={showHighlightedRows}
          onChange={handleShowHighlightedRowsChange}
          className="w-5 h-5 text-indigo-600 form-checkbox"
        />
      </div>
      <ShadcnTable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    <Link href={`/drones/${header.column.columnDef.id}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Link>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="flex-wrap content-center w-7 "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </ShadcnTable>
    </>
  );
}
