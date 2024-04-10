import Group from "@/constants/group"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface GeoFeature extends GeoJSON.Feature<GeoJSON.Geometry, any> {
    state: State
}

export interface StateGeoFeature extends GeoFeature {
    properties: {
        state: State
    }
}

export interface RegularDistrictGeoFeature extends GeoFeature {
    properties: {
        district: number
    }
}

export interface HeatDistrictGeoFeature extends GeoFeature {
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
    features: HeatDistrictGeoFeature[]
}

// NOTE: caching will not be used for these endpoints due to the size of the GeoJSON data
export const mapApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/map`,
    }),
    reducerPath: "map-api",
    // tagTypes: ["Regular", "Heat"],
    endpoints: build => ({
        getAllStates: build.query<StateGeoFeature[], void>({
            query: () => "/states",
        }),
        getRegularDistricts: build.query<RegularDistrictGeoFeature[], State>({
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
