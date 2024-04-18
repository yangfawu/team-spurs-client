import { HeatDistrictGeoFeature } from "@/api/map"
import { AssemblyDistrictGeoFeature } from "@/api/map"
import { HeatMapLegend } from "@/api/map"
import { StateGeoFeature } from "@/api/map"
import Group from "@/constants/group"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface HeatMapPayload {
    state: State
    group: Group
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
        getRegularDistricts: build.query<AssemblyDistrictGeoFeature[], State>({
            query: state => `/regular/${state}`,
        }),
        getHeatDistricts: build.query<HeatDistrictGeoFeature[], HeatMapPayload>({
            query: ({ state, group }) => `/heat/${state}/${group}`,
        }),
        getHeatLegend: build.query<HeatMapLegend, HeatMapPayload>({
            query: ({ state, group }) => `/heat/legend/${state}/${group}`,
        })
    }),
})

export const {
    useGetAllStatesQuery: fetchAllStatesMap,
    useGetRegularDistrictsQuery: fetchRegularDistrictMap,
    useGetHeatDistrictsQuery: fetchHeatMap,
    useGetHeatLegendQuery: fetchHeatLegend,
} = mapApi
