import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

export interface SeawulfFeature extends GeoJSON.Feature<GeoJSON.Geometry, any> {
    id: string
    state: State
    plan: number
    district: number
    properties: {
        plan: number
        district: number
    }
}

export interface SeawulfPlan {
    id: string
    state: State
    plan: number
    comments: string[]
}

const NAME = "plan"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

export function fetchSeawulfPlanOptions(state: State) {
    return queryOptions<SeawulfPlan[]>({
        queryKey: [NAME, "fetchSeawulfPlanOptions", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/options`, { signal })
            const data: SeawulfPlan[] = await res.json()
            return data
        },
    })
}

export function fetchSeawulfPlan(state: State, plan: number) {
    return queryOptions<SeawulfFeature[]>({
        queryKey: [NAME, "fetchSeawulfPlan", state, plan],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}/features/${plan}`, { signal })
            const data: SeawulfFeature[] = await res.json()
            return data
        },
    })
}
