import Group from "@/constants/group"
import Party from "@/constants/party"
import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

export interface Representative {
    first_name: string
    last_name: string
    district: number
    party: Party
    race: Group[]
    image: string
    state: State
}

const NAME = "representative"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/reps`

// TODO: move to assembly.ts
export function fetchRepresentatives(state: State) {
    return queryOptions<Representative[]>({
        queryKey: [NAME, "fetchRepresentatives", state],
        queryFn: async ({ signal }) => {
            const res = await fetch(`${BASE_URL}/${state}`, { signal })
            const data: Representative[] = await res.json()
            data.sort((a, b) => a.district - b.district)
            return data
        },
        staleTime: Infinity,
    })
}
