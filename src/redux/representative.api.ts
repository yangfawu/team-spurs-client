import { Representative } from "@/api/representative"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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
