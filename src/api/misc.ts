import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"
export interface StateGeoFeature extends GeoJSON.Feature<GeoJSON.Geometry, any> {
    id: string
    state: State
    properties: {
        state: State
    }
}

const NAME = "misc"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

export function fetchAllStatesMap() {
    return queryOptions<StateGeoFeature[]>({
        queryKey: [NAME, "fetchAllStatesMap"],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/states`, { signal })
            const data: StateGeoFeature[] = await res.json()
            return data
        },
    })
}
