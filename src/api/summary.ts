import Group from "@/constants/group"
import Party from "@/constants/party"
import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

export interface StateDemographic {
    count: Record<Group, number>
    state: State
}

export interface Representative {
    first_name: string
    last_name: string
    district: number
    party: Party
    race: Group[]
    image: string
    state: State
    vote_margin: number
}

export interface AssemblyDistrictGeoFeature extends GeoJSON.Feature<GeoJSON.Geometry, any> {
    id: string
    state: State
    properties: {
        district: number
    }
}

export interface RedistricitngInfo {
    state: State
    name: string
    website: string
    comments: string
}

export interface VoterInfo {
    state: State
    breakdown: Record<Party, number>
    // facts: string[]
}

export interface OpportunityDistrictStat {
    state: State
    group: Group
    threshold: number // 37, 44, 50
    ideal_population: number
    actual_population: number
    actual_opp_districts: number[] // list of district IDs
    max_opp_districts: number
    avg_opp_districts: number
}

const NAME = "summary"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

export function fetchStateDemographic(state: State) {
    return queryOptions<StateDemographic>({
        queryKey: [NAME, "fetchStateDemographic", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/demographic`, { signal })
            const data: StateDemographic = await res.json()
            return data
        },
    })
}

export function fetchStateAssemblyMap(state: State) {
    return queryOptions<AssemblyDistrictGeoFeature[]>({
        queryKey: [NAME, "fetchStateAssemblyMap", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/plan`, { signal })
            const data: AssemblyDistrictGeoFeature[] = await res.json()
            return data
        },
    })
}

export function fetchRepresentatives(state: State) {
    return queryOptions<Representative[]>({
        queryKey: [NAME, "fetchRepresentatives", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/representatives`, { signal })
            const data: Representative[] = await res.json()
            data.sort((a, b) => a.district - b.district)
            return data
        },
    })
}

export function fetchRedistrictingInfo(state: State) {
    return queryOptions<RedistricitngInfo>({
        queryKey: [NAME, "fetchRedistrictingInfo", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/redistricting`, { signal })
            const data: RedistricitngInfo = await res.json()
            return data
        },
    })
}

export function fetchStateVoterDistribution(state: State) {
    return queryOptions<VoterInfo>({
        queryKey: [NAME, "fetchVoterInfo", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/voter`, { signal })
            const data: VoterInfo = await res.json()
            return data
        },
    })
}

export function fetchStateOpportunityDistrictStats(state: State, threshold: number) {
    return queryOptions<OpportunityDistrictStat[]>({
        queryKey: [NAME, "fetchOpportunityDistrictStats", state, threshold],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/opportunity/${threshold}`, { signal })
            const data: OpportunityDistrictStat[] = await res.json()
            return data
        },
    })
}
