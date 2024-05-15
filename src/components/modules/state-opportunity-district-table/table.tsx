import { fetchStateOpportunityDistrictStats } from "@/api/summary"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import tw from "tailwind-styled-components"
import { useThresholdContext } from "./context"
import { COLUMNS } from "./data"
import { useDistrictShowcase } from "@/contexts/district-showcase"

interface Props {
    state: State
}
export default function Table({ state }: Props) {
    const { threshold } = useThresholdContext()
    const { data } = useSuspenseQuery(fetchStateOpportunityDistrictStats(state, threshold))

    const { getHeaderGroups, getRowModel } = useReactTable({
        data,
        columns: COLUMNS,
        getCoreRowModel: getCoreRowModel(),
    })

    const { setDistricts } = useDistrictShowcase()

    return (
        <Container>
            <thead className="sticky top-0 bg-white shadow">
                {getHeaderGroups().map(({ id, headers }) => (
                    <tr key={id}>
                        {headers.map(
                            ({
                                id: hid,
                                isPlaceholder,
                                getContext,
                                column: {
                                    columnDef: { header },
                                },
                            }) => (
                                <th key={hid} className="border px-1">
                                    {isPlaceholder ? null : flexRender(header, getContext())}
                                </th>
                            ),
                        )}
                    </tr>
                ))}
            </thead>
            <tbody className="divide-y-2">
                {getRowModel().rows.length < 1 ? (
                    <tr>
                        <td colSpan={COLUMNS.length} className="py-2 text-center h-full">
                            <em>no data available</em>
                        </td>
                    </tr>
                ) : (
                    getRowModel().rows.map(({ id, getVisibleCells, original }) => (
                        <InteractiveRow
                            key={id}
                            onClick={() => setDistricts(original.actual_opp_districts.map(d => `${state}-${d}`))}
                        >
                            {getVisibleCells().map(
                                ({
                                    id: cid,
                                    getContext,
                                    column: {
                                        columnDef: { cell },
                                    },
                                }) => (
                                    <td key={cid} className="p-2 border" align="center">
                                        {flexRender(cell, getContext())}
                                    </td>
                                ),
                            )}
                        </InteractiveRow>
                    ))
                )}
            </tbody>
        </Container>
    )
}

const Container = tw.table`
    relative
    w-full
    max-h-64
    flex-1
    table-auto
    border border-collapse
`

const InteractiveRow = tw.tr`
    active:bg-gray-200
`
