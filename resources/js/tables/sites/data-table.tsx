import {
    Column,
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    OnChangeFn,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Filter from "@/tables/sites/filter";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
    columnFilters: ColumnFiltersState;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        manualFiltering: true,
        state: {
            columnFilters,
            sorting,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <>
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                            <TableRow key="filters">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.column.getCanFilter() ? (
                                            <Filter
                                                column={header.column as Column<unknown, unknown>}
                                            />
                                        ) : null}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
