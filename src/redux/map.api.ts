import Group from "@/constants/group"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface GeoJson {
    state: State
    type: string
    geometry: object
    properties: Record<string, any>
}

export interface StateGeoJson extends GeoJson {
    properties: {
        state: State
    }
}

export interface RegularDistrictGeoJson extends GeoJson {
    properties: {
        district: number
    }
}

export interface HeatDistrictGeoJson extends GeoJson {
    properties: {
        district: number
        heat_value: number
    }
}

interface HeatMapPayload {
    state: State
    group: Group
}

interface HeatMapResponse {
    min: number
    max: number
    features: HeatDistrictGeoJson[]
}

// NOTE: caching will not be used for these endpoints due to the size of the GeoJSON data
export const mapApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/map`,
    }),
    reducerPath: "map-api",
    // tagTypes: ["Regular", "Heat"],
    endpoints: build => ({
        getAllStates: build.query<StateGeoJson[], void>({
            query: () => "/states",
        }),
        getRegularDistricts: build.query<RegularDistrictGeoJson[], State>({
            query: state => `/regular/${state}`,
            // providesTags: (_, __, id) => [{ type: "Regular", id }],
        }),
        getHeatDistricts: build.query<HeatMapResponse, HeatMapPayload>({
            query: ({ state, group }) => `/heat/${state}/${group}`,
            // providesTags: (_, __, { state, group }) => [{ type: "Heat", id: `${state}-${group}` }],
        }),
    }),
})

export const {
    useGetAllStatesQuery: fetchAllStatesMap,
    useGetRegularDistrictsQuery: fetchRegularDistrictMap,
    useGetHeatDistrictsQuery: fetchHeatMap,
} = mapApi
