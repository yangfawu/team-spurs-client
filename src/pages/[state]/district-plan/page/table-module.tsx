import data from "@/assets/fake-reps.json"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

type Representative = (typeof data)[number]

const ch = createColumnHelper<Representative>()

export default function TableModule() {
    const { getHeaderGroups, getRowModel } = useReactTable({
        data,
        columns: [
            ch.accessor("district", {
                header: () => "District",
                cell: c => c.getValue(),
            }),
            ch.accessor("image", {
                header: () => "Photo",
                cell: c => <img src={c.getValue()} alt={`rep ${c.row.original.district}`} className="w-16 h-16" />,
            }),
            ch.accessor("first_name", {
                header: () => "First Name",
                cell: c => c.getValue(),
            }),
            ch.accessor("last_name", {
                header: () => "Last Name",
                cell: c => c.getValue(),
            }),
            ch.accessor("party", {
                header: () => "Party",
                cell: c => {
                    switch (c.getValue()) {
                        case "I":
                            return "Independent"
                        case "R":
                            return "Republican"
                        case "D":
                            return "Democrat"
                        default:
                            return "Unknown"
                    }
                },
            }),
            ch.accessor(r => [r.race, r.race2], {
                id: "race",
                header: () => "Race(s)",
                cell: c => {
                    const val = c.getValue<(string | null)[]>()
                    return val.filter(e => e !== null).join(", ") || "Unknown"
                },
            }),
        ],
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="h-full overflow-auto">
            <table className="relative w-full">
                <thead className="sticky top-0 bg-white shadow">
                    {getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y-2">
                    {getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-100 active:bg-gray-200">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="py-2" align="center">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
