import useSelectedState from "@/hooks/use-selected-state"
import { selectDistrict, showcaseDistrict } from "@/redux/district-plan.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useGetRegularDistrictMapQuery } from "@/redux/map.api"
import { Representative, useGetRepresentativesQuery } from "@/redux/reps.api"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import L, { Map } from "leaflet"
import { RefObject, useEffect, useMemo } from "react"
import tw from "tailwind-styled-components"

const ch = createColumnHelper<Representative>()
const COLUMNS = [
    ch.accessor("district", {
        header: () => "District",
        cell: c => c.getValue(),
    }),
    ch.accessor("image", {
        header: () => "Photo",
        cell: c => (
            <img src={c.getValue()} alt={`rep ${c.row.original.district}`} className="w-16 h-16 object-contain" />
        ),
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
]

interface Props {
    mapRef: RefObject<Map>
}
export default function TableModule({ mapRef }: Props) {
    const dispatch = useAppDispatch()
    const chosenDistrict = useAppSelector(selectDistrict)

    const state = useSelectedState()
    const { currentData: mapData, isSuccess: mapSuccess } = useGetRegularDistrictMapQuery(state)
    const { currentData: tableData, isSuccess: tableSuccess } = useGetRepresentativesQuery(state)
    const isSuccess = mapSuccess && tableSuccess

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: tableData || [],
        columns: COLUMNS,
        getCoreRowModel: getCoreRowModel(),
    })

    const select = useMemo(() => {
        return (id: number) => {
            dispatch(showcaseDistrict(id))

            if (isSuccess && mapData?.features) {
                const target = mapData.features.find(f => Number(f.properties?.DISTRICT) === id)
                if (target) {
                    const bounds = L.geoJSON(target).getBounds()
                    mapRef.current?.fitBounds(bounds)
                }
            }
        }
    }, [mapRef, mapData, isSuccess])

    useEffect(() => {
        if (chosenDistrict === undefined) return
        const target = document.querySelector(`tr[data-district="${chosenDistrict}"]`)
        if (target) {
            target.scrollIntoView({
                block: "nearest",
                inline: "nearest",
                behavior: "instant",
            })
        }
    }, [chosenDistrict])

    return (
        <div className="h-full overflow-auto scroll-pt-7">
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
                        <InteractiveRow
                            key={row.id}
                            data-district={row.original.district}
                            className={chosenDistrict === row.original.district ? "bg-green-100" : ""}
                            onClick={() => select(row.original.district)}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="py-2" align="center">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </InteractiveRow>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const InteractiveRow = tw.tr`
    active:bg-gray-200
`
