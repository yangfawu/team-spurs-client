import Group from "@/constants/group"
import Party from "@/constants/party"
import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

const NAME = "precinct"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

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

export interface RegressionLine {
    id: string
    state: State
    group: Group
    party: Party
    type: "exponential_decay"
    coefficients: number[]
}

interface PrecinctAnalysis {
    rows: PrecinctPoint[]
    lines: RegressionLine[]
}

export function fetchPrecinctAnalysis(state: State, group: Group) {
    return queryOptions<PrecinctAnalysis>({
        queryKey: [NAME, "fetchPrecinctAnalysis", state, group],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/${group}`, { signal })
            const data: PrecinctAnalysis = await res.json()
            return data
        },
    })
}
