import Party from "@/constants/party"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Representative {
    first_name: string
    last_name: string
    district: number
    party: Party
    race: string[]
    image: string
    state: State
}

export const repsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/reps`
    }),
    reducerPath: "reps-api",
    tagTypes: ["Reps"],
    endpoints: build => ({
        getRepresentatives: build.query<Representative[], State>({
            query: state => `/${state}`,
            providesTags: (_, __, id) => [{ type: "Reps", id }],
        }),
    }),
})

export const { useGetRepresentativesQuery, useLazyGetRepresentativesQuery } = repsApi
