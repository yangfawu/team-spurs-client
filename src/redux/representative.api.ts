import Group from "@/constants/group"
import Party from "@/constants/party"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Representative {
    first_name: string
    last_name: string
    district: number
    party: Party
    race: Group[]
    image: string
    state: State
}

export const representativeApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/reps`,
    }),
    reducerPath: "representative-api",
    tagTypes: ["representative"],
    endpoints: build => ({
        getRepresentatives: build.query<Representative[], State>({
            query: state => `/${state}`,
            providesTags: (_, __, id) => [{ type: "representative", id }],
        }),
    }),
})

export const { useGetRepresentativesQuery: fetchRepresentatives } = representativeApi
