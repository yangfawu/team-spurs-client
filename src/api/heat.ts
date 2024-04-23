import Group from "@/constants/group"
import HeatLevel from "@/constants/heat-level"
import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

export interface HeatMapFeature extends GeoJSON.Feature<GeoJSON.Geometry, any> {
    id: string
    state: State
    level: HeatLevel
    bins: Record<Group, number>
    title: string
    demographic: Record<Group, number>
}

export interface HeatMapLegend {
    id: string
    state: State
    group: Group
    level: HeatLevel
    bins: {
        color: string
        min: number
        max: number
    }[]
}

export interface HeatMap {
    features: HeatMapFeature[]
    legend: HeatMapLegend
}

const NAME = "heat"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

export function fetchHeatMap(state: State, level: HeatLevel, group: Group) {
    return queryOptions<HeatMap>({
        queryKey: [NAME, "fetchHeatMap", state, level, group],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/${level}/${group}`, { signal })
            const data: HeatMap = await res.json()
            return data
        },
    })
}
