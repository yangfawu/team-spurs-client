import Group from "@/constants/group"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type RawOverallDemographicsResponse = {
    label: string
    population: number
    percent_makeup: number
    state: string
}[]

type OverallDemographicsResponse = {
    mongoKey: string
    groupKey: Group
    label: {
        long: string
        short: string
    }
    count: number
}[]

interface OverallGroupDemographicsPayload {
    state: State
    group: Group
}

type DistrictDemographicsResponse = {
    districtId: number
    total: number
    hl: number
    white: number
    black: number
    aian: number
    asian: number
    hpi: number
    other: number
    mixed: number
}[]

export const distributionApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/distribution`,
    }),
    reducerPath: "distribution-api",
    tagTypes: ["Overall", "Group-Overall", "District"],
    endpoints: build => ({
        getOverallDemographicsByState: build.query<OverallDemographicsResponse, State>({
            query: state => `/overall/${state}`,
            providesTags: (_, __, id) => [{ type: "Overall", id }],
        }),
        getOverallGroupDemographicsByState: build.query<any, OverallGroupDemographicsPayload>({
            query: state => `/overall/${state}`,
            providesTags: (_, __, { group, state }) => [{ type: "Overall", id: `${state}-${group}` }],
        }),
        getDistrictDemographicsByState: build.query<DistrictDemographicsResponse, State>({
            query: state => `/district/${state}`,
            providesTags: (_, __, id) => [{ type: "District", id }],
        }),
    }),
})

export const {
    useGetDistrictDemographicsByStateQuery,
    useGetOverallDemographicsByStateQuery,
    useGetOverallGroupDemographicsByStateQuery,
    useLazyGetDistrictDemographicsByStateQuery,
    useLazyGetOverallDemographicsByStateQuery,
    useLazyGetOverallGroupDemographicsByStateQuery,
} = distributionApi
