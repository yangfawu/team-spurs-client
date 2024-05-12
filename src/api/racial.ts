import Group from "@/constants/group"
import HeatLevel from "@/constants/heat-level"
import Party from "@/constants/party"
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

export interface RegressionLine {
    id: string
    state: State
    group: Group
    party: Party
    coefficients: number[]
}

export interface PrecinctPoint {
    id: string
    state: State
    group: Group
    name: string
    total_population: number
    group_population: number
    percent_group: number
    percent_democrat: number
    percent_republican: number
}

export interface BoxAndWhisker {
    id: string
    state: State
    group: Group
    district: number
    min: number
    q1: number
    med: number
    q3: number
    max: number
}

interface PrecinctAnalysis {
    rows: PrecinctPoint[]
    lines: RegressionLine[]
}

interface BoxAndWhiskerAnalysis {
    enacted: number[]
    boxes: BoxAndWhisker[]
}

const NAME = "racial"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

export function fetchHeatMap(state: State, level: HeatLevel, group: Group) {
    return queryOptions<HeatMap>({
        queryKey: [NAME, "fetchHeatMap", state, level, group],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/heat/${state}/${level}/${group}`, { signal })
            const data: HeatMap = await res.json()
            return data
        },
    })
}

export function fetchPrecinctAnalysis(state: State, group: Group) {
    return queryOptions<PrecinctAnalysis>({
        queryKey: [NAME, "fetchPrecinctAnalysis", state, group],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/precinct/${state}/${group}`, { signal })
            const data: PrecinctAnalysis = await res.json()
            return data
        },
    })
}

export function fetchBoxAndWhiskerAnalysis(state: State, group: Group) {
    return queryOptions<BoxAndWhiskerAnalysis>({
        queryKey: [NAME, "fetchBoxAndWhiskerAnalysis", state, group],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/box/${state}/${group}`, { signal })
            const data: BoxAndWhiskerAnalysis = await res.json()
            return data
        },
    })
}
