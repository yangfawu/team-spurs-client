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

const NAME = "demographic"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/demo`

// TODO: move this to assembly.ts after changes to backend
export function fetchStateDemographic(state: State) {
    return queryOptions<StateDemographic>({
        queryKey: [NAME, "fetchStateDemographic", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/overall/${state}`, { signal })
            const data: StateDemographic = await res.json()
            return data
        },
    })
}

export function fetchDistrictsDemographics(state: State) {
    return queryOptions<DistrictDemographic[]>({
        queryKey: [NAME, "fetchDistrictsDemographics", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/district/${state}`, { signal })
            const data: DistrictDemographic[] = await res.json()
            return data
        },
    })
}

export function fetchOneDistrictDemographic(state: State, district: number) {
    return queryOptions<GroupBar[]>({
        queryKey: [NAME, "fetchOneDistrictDemographic", state, district],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/district/${state}`, { signal })
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
    })
}
