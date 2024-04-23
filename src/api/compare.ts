import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

export interface SeawulfMapFeature extends GeoJSON.Feature<GeoJSON.Geometry, any> {
    id: string
    state: State
    plan: string
}

const NAME = "compare"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

export function fetchSeawulfPlanOptions(state: State) {
    return queryOptions<string[]>({
        queryKey: [NAME, "fetchSeawulfPlanOptions", state],
        queryFn: async ({ signal }) => {
            return ["Current", "Proposed"]
            // const res = await fetch(`${BASE_URL}/${state}/options`, { signal })
            // const data: string[] = await res.json()
            // return data
        },
    })
}

export function fetchSeawulfPlan(plan: string) {
    return queryOptions<SeawulfMapFeature[]>({
        queryKey: [NAME, "fetchSeawulfPlan", plan],
        queryFn: async ({ signal }) => {
            return [
                {
                    id: "123",
                    state: State.NJ,
                    plan: "Current",
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [-75.5636, 38.9283],
                                [-75.5636, 41.3572],
                                [-73.8851, 41.3572],
                                [-73.8851, 38.9283],
                                [-75.5636, 38.9283],
                            ],
                        ],
                    },
                    properties: {},
                },
            ]
            // const res = await fetch(`${BASE_URL}/plan/${plan}`, { signal })
            // const data: SeawulfMapFeature[] = await res.json()
            // return data
        },
    })
}
