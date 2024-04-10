import Group from "@/constants/group"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface RegularDistrictMapResponse {
    type: string
    features: GeoJSON.Feature[]
}

interface HeatDistrictMapPayload {
    state: State
    group: Group
}

interface HeatDistrictMapResponse {
    key: string
    min: number
    max: number
    table: Record<string, Record<string, number>>
    map: {
        type: string
        features: GeoJSON.Feature[]
    }
}

export const mapApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/map`,
    }),
    reducerPath: "map-api",
    tagTypes: ["Regular", "Heat"],
    endpoints: build => ({
        getRegularDistrictMap: build.query<RegularDistrictMapResponse, State>({
            query: state => `/regular/${state}`,
            providesTags: (_, __, id) => [{ type: "Regular", id }],
        }),
        getHeatDistrictMap: build.query<HeatDistrictMapResponse, HeatDistrictMapPayload>({
            query: ({ state, group }) => `/heat/${state}/${group}`,
            providesTags: (_, __, { state, group }) => [{ type: "Heat", id: `${state}-${group}` }],
        }),
    }),
})

export const {
    useGetRegularDistrictMapQuery,
    useGetHeatDistrictMapQuery,
    useLazyGetHeatDistrictMapQuery,
    useLazyGetRegularDistrictMapQuery,
} = mapApi
