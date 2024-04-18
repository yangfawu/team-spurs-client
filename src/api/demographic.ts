import Group from "@/constants/group"
import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

export interface StateDemographic {
    count: Record<Group, number>
    state: State
}

export interface DistrictDemographic {
    count: Record<Group, number>
    district: number
    state: State
}

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/demo`

export function fetchStateDemographic(state: State) {
    return queryOptions<StateDemographic>({
        queryKey: ["demographic", "state", state],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/overall/${state}`)
            const data: StateDemographic = await res.json()
            return data
        },
    })
}

export function fetchDistrictsDemographics(state: State) {
    return queryOptions<DistrictDemographic[]>({
        queryKey: ["demographic", "districts", state],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/district/${state}`)
            const data: DistrictDemographic[] = await res.json()
            return data
        },
    })
}
