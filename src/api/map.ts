import Group from "@/constants/group"
import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

interface GeoFeature extends GeoJSON.Feature<GeoJSON.Geometry, any> {
    id: string
    state: State
}

export interface AssemblyDistrictGeoFeature extends GeoFeature {
    properties: {
        district: number
    }
}

export interface HeatDistrictGeoFeature extends GeoFeature {
    properties: {
        district: number
        heat_value: number
    }
}

export interface HeatMapLegend {
    state: State
    group: Group
    min: number
    max: number
}

export interface StateGeoFeature extends GeoFeature {
    properties: {
        state: State
    }
}

const NAME = "map"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

export function fetchAllStatesMap() {
    return queryOptions<StateGeoFeature[]>({
        queryKey: [NAME, "fetchAllStatesMap"],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/states`, { signal })
            const data: StateGeoFeature[] = await res.json()
            return data
        },
        staleTime: Infinity,
    })
}

export function fetchStateAssemblyMap(state: State) {
    return queryOptions<AssemblyDistrictGeoFeature[]>({
        queryKey: [NAME, "fetchStateAssemblyMap", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/regular/${state}`, { signal })
            const data: AssemblyDistrictGeoFeature[] = await res.json()
            return data
        },
    })
}

export function fetchGroupHeatMap(state: State, group: Group) {
    return queryOptions<HeatDistrictGeoFeature[]>({
        queryKey: [NAME, "fetchGroupHeatMap", state, group],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/heat/${state}/${group}`, { signal })
            const data: HeatDistrictGeoFeature[] = await res.json()
            return data
        },
    })
}

export function fetchGroupHeatMapLegend(state: State, group: Group) {
    return queryOptions<HeatMapLegend>({
        queryKey: [NAME, "fetchGroupHeatMapLegend", state, group],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/heat/legend/${state}/${group}`, { signal })
            const data: HeatMapLegend = await res.json()
            return data
        },
    })
}
