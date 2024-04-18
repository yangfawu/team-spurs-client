import Group, { GROUP_TO_ABBREV, GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
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

export interface GroupBar {
    group: Group
    label: {
        long: string
        short: string
    }
    value: number
}

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/demo`

export function fetchStateDemographic(state: State) {
    return queryOptions<GroupBar[]>({
        queryKey: ["demographic", "state", state],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/overall/${state}`)
            const data: StateDemographic = await res.json()

            const out: GroupBar[] = []

            // Compute the data for the chart
            const { count } = data
            for (const group of SUPPORTED_GROUPS) {
                if (group in count) {
                    const name = GROUP_TO_NAME[group]
                    const short = GROUP_TO_ABBREV[group]
                    out.push({
                        group,
                        label: { long: name, short },
                        value: count[group],
                    })
                }
            }

            // Sort the bars by population
            out.sort((a, b) => b.value - a.value)

            return out
        },
        staleTime: Infinity,
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
        staleTime: Infinity,
    })
}

export function fetchOneDistrictDemographic(state: State, district: number) {
    return queryOptions<GroupBar[]>({
        queryKey: ["demographic", "district", state, district],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/district/${state}`)
            const data: DistrictDemographic[] = await res.json()

            // Locate the district data
            const target = data.find(({ district: $d }) => $d === district)
            if (!target) return []

            const out: GroupBar[] = []

            // Compute the data for the chart
            const { count } = target
            for (const group of SUPPORTED_GROUPS) {
                if (group in count) {
                    const name = GROUP_TO_NAME[group]
                    const short = GROUP_TO_ABBREV[group]
                    out.push({
                        group,
                        label: { long: name, short },
                        value: count[group],
                    })
                }
            }

            // Sort the bars by population
            out.sort((a, b) => b.value - a.value)

            return out
        },
        staleTime: Infinity,
    })
}
