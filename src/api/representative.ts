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

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/reps`

export function fetchRepresentatives(state: State) {
    return queryOptions<Representative[]>({
        queryKey: ["representative", state],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/${state}`)
            const data: Representative[] = await res.json()

            data.sort((a, b) => a.district - b.district)

            return data
        },
    })
}
