import { SupportedStateKey } from "@/constants/states"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Representative {
    first_name: string
    last_name: string
    district: number
    party: string
    race: string
    race2: string | null
    image: string
    state: string
}

type RegularDistrictMapResponse = Representative[]

export const repsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/reps`,
    }),
    reducerPath: "reps-api",
    tagTypes: ["Reps"],
    endpoints: build => ({
        getRepresentatives: build.query<RegularDistrictMapResponse, SupportedStateKey>({
            query: state => `/${state}`,
            providesTags: (_, __, id) => [{ type: "Reps", id }],
        }),
    }),
})

export const { useGetRepresentativesQuery, useLazyGetRepresentativesQuery } = repsApi
