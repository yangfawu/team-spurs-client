import { PrecinctPoint, fetchPrecinctAnalysis } from "@/api/racial"
import Group from "@/constants/group"
import State from "@/constants/state"
import { usePrecinctShowcase } from "@/contexts/precinct-showcase"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Row, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useEffect, useRef } from "react"
import tw from "tailwind-styled-components"
import { COLUMNS } from "./data"

interface Props {
    state: State
    group: Group
}
export default function Content({ state, group }: Props) {
    const { data } = useSuspenseQuery(fetchPrecinctAnalysis(state, group))

    const tableRef = useRef<HTMLTableElement>(null)
    const { getHeaderGroups, getRowModel } = useReactTable({
        data: data.rows,
        columns: COLUMNS,
        getCoreRowModel: getCoreRowModel(),
    })

    const { rows } = getRowModel()
    const { getTotalSize, getVirtualItems, measureElement } = useVirtualizer({
        count: rows.length,
        estimateSize: () => 48, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableRef.current,
        //measure dynamic row height, except in firefox because it measures table border height incorrectly
        measureElement:
            typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
                ? element => element?.getBoundingClientRect().height
                : undefined,
        overscan: 5,
    })

    const context = usePrecinctShowcase()
    useEffect(() => {
        if (context?.precinct === null) return
        
        const element = document.querySelector(`tr[id="${context.precinct}"]`)
        element?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, [context?.precinct])

    const items = getVirtualItems()
    return (
        <Container>
            <table ref={tableRef} className="w-full table-auto border border-collapse">
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
                                    <th key={hid} className="border px-2 py-1 text-nowrap">
                                        {isPlaceholder ? null : flexRender(header, getContext())}
                                    </th>
                                ),
                            )}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y-2" style={{ height: `${getTotalSize()}px` }}>
                    {items.length < 1 ? (
                        <tr>
                            <td colSpan={COLUMNS.length} className="p-2 text-center h-full">
                                <em>no data available</em>
                            </td>
                        </tr>
                    ) : (
                        items.map(virtualRow => {
                            const { index, id, getVisibleCells, original } = rows[
                                virtualRow.index
                            ] as Row<PrecinctPoint>
                            return (
                                <tr
                                    key={id}
                                    id={original.id}
                                    className={original.id === context?.precinct ? "bg-yellow-400/30" : ""}
                                    ref={node => measureElement(node)}
                                    data-index={index}
                                >
                                    {getVisibleCells().map(
                                        ({
                                            id: cid,
                                            getContext,
                                            column: {
                                                columnDef: { cell },
                                            },
                                        }) => (
                                            <td key={cid} className="p-2 border text-nowrap">
                                                {flexRender(cell, getContext())}
                                            </td>
                                        ),
                                    )}
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </Container>
    )
}

const Container = tw.div`
    relative
    flex-1
`
