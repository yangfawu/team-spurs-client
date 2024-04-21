import { fetchStateAssemblyMap } from "@/api/map"
import { Representative } from "@/api/representative"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useMapRef } from "@/contexts/map-ref"
import { selectDistrict, showcaseDistrict } from "@/redux/assembly"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useSuspenseQuery } from "@tanstack/react-query"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import L from "leaflet"
import { useMemo } from "react"
import tw from "tailwind-styled-components"
import { COLUMNS } from "./data"

interface Props {
    data: Representative[]
}
export default function Table({ data }: Props) {
    const state = useSafeCurrentState()
    const { data: features } = useSuspenseQuery(fetchStateAssemblyMap(state))

    const { getHeaderGroups, getRowModel } = useReactTable({
        data,
        columns: COLUMNS,
        getCoreRowModel: getCoreRowModel(),
    })

    const mapRef = useMapRef()
    const zoomIn = useMemo(() => {
        return (id: number) => {
            if (mapRef.current && features) {
                const target = features.find(({ properties }) => properties.district === id)
                if (target) {
                    const bounds = L.geoJSON(target).getBounds()
                    mapRef.current.fitBounds(bounds)
                }
            }
        }
    }, [mapRef, features])

    const dispatch = useAppDispatch()
    const select = useMemo(() => {
        return (id: number) => {
            dispatch(showcaseDistrict({ state, id }))
            zoomIn(id)
        }
    }, [state, zoomIn])

    const district = useAppSelector(selectDistrict)
    const isFeatured = (d: number) => state === district?.state && d === district?.id

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
                                <th key={hid} className="border">
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
                            className={isFeatured(original.district) ? "bg-green-100" : ""}
                            onClick={() => select(original.district)}
                        >
                            {getVisibleCells().map(
                                ({
                                    id: cid,
                                    getContext,
                                    column: {
                                        columnDef: { cell },
                                    },
                                }) => (
                                    <td key={cid} className="py-2 border" align="center">
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
    flex-1
    table-auto
    border border-collapse
`

const InteractiveRow = tw.tr`
    active:bg-gray-200
`
