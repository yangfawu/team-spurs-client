import Group from "@/constants/group"
import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

interface GeoFeature extends GeoJSON.Feature<GeoJSON.Geometry, any> {
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

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/map`

export function fetchAllStatesMap() {
    return queryOptions<StateGeoFeature[]>({
        queryKey: ["map", "states"],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/states`)
            const data: StateGeoFeature[] = await res.json()
            return data
        },
    })
}

export function fetchStateAssemblyMap(state: State) {
    return queryOptions<AssemblyDistrictGeoFeature[]>({
        queryKey: ["map", "assembly", state],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/regular/${state}`)
            const data: AssemblyDistrictGeoFeature[] = await res.json()
            return data
        },
    })
}

export function fetchGroupHeatMap(state: State, group: Group) {
    return queryOptions<HeatDistrictGeoFeature[]>({
        queryKey: ["map", "heat", state, group],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/heat/${state}/${group}`)
            const data: HeatDistrictGeoFeature[] = await res.json()
            return data
        },
    })
}

export function fetchGroupHeatMapLegend(state: State, group: Group) {
    return queryOptions<HeatMapLegend>({
        queryKey: ["map", "heat", "legend", state, group],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/heat/legend/${state}/${group}`)
            const data: HeatMapLegend = await res.json()
            return data
        },
    })
}
