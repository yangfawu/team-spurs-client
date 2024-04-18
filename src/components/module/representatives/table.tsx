import { fetchStateAssemblyMap } from "@/api/map"
import { Representative, fetchRepresentatives } from "@/api/representative"
import { GROUP_TO_NAME } from "@/constants/group"
import { PARTY_TO_NAME } from "@/constants/party"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useMapRef } from "@/contexts/map-ref"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectDistrict, showcaseDistrict } from "@/redux/showcase"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import L from "leaflet"
import { useEffect, useMemo } from "react"
import tw from "tailwind-styled-components"

export default function Table() {
    const mapRef = useMapRef()

    const dispatch = useAppDispatch()

    const district = useAppSelector(selectDistrict)

    const state = useSafeCurrentState()
    const { data: features } = useSuspenseQuery(fetchStateAssemblyMap(state))
    const { data: reps } = useSuspenseQuery(fetchRepresentatives(state))

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: reps || [],
        columns: COLUMNS,
        getCoreRowModel: getCoreRowModel(),
    })

    const select = useMemo(() => {
        return ($d: number) => {
            // Notify that a district has been selected
            dispatch(showcaseDistrict($d))

            // If map and geojson data is available, zoom to the district
            if (mapRef.current && features) {
                const target = features.find(({ properties }) => properties.district === $d)
                if (target) {
                    const bounds = L.geoJSON(target).getBounds()
                    mapRef.current.fitBounds(bounds)
                }
            }
        }
    }, [mapRef, features])

    useEffect(() => {
        if (district === undefined) return

        // Scroll to the closest representative row when a district is selected
        const target = document.querySelector(`tr[data-district="${district}"]`)
        if (target) {
            target.scrollIntoView({
                block: "nearest",
                inline: "nearest",
                behavior: "instant",
            })
        }
    }, [district])

    return (
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
                        className={district === row.original.district ? "bg-green-100" : ""}
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
    )
}

const InteractiveRow = tw.tr`
    active:bg-gray-200
`

const ch = createColumnHelper<Representative>()
const COLUMNS = [
    ch.accessor("district", {
        header: () => "District",
        cell: c => c.getValue(),
    }),
    ch.accessor("image", {
        header: () => "Photo",
        cell: c => <img src={c.getValue()} className="w-16 h-16 object-contain" />,
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
        cell: c => PARTY_TO_NAME[c.getValue()],
    }),
    ch.accessor("race", {
        header: () => "Race(s)",
        cell: c =>
            c
                .getValue()
                .map($g => GROUP_TO_NAME[$g])
                .join(", "),
    }),
]
