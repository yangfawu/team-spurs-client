import Group from "@/constants/group"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface StateDemographic {
    count: Record<Group, number>
    state: State
}

export interface DistrictDemographic {
    count: Record<Group, number>
    district: number
    state: State
}

export const demographicApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/demo`,
    }),
    reducerPath: "demographic-api",
    tagTypes: ["State", "District"],
    endpoints: build => ({
        getStateDemographic: build.query<StateDemographic, State>({
            query: state => `/overall/${state}`,
            providesTags: (_, __, id) => [{ type: "State", id }],
        }),
        getDistrictsDemographics: build.query<DistrictDemographic[], State>({
            query: state => `/district/${state}`,
            providesTags: (_, __, id) => [{ type: "District", id }],
        }),
    }),
})

export const {
    useGetStateDemographicQuery: fetchStateDemographic,
    useGetDistrictsDemographicsQuery: fetchDistrictsDemographics,
} = demographicApi
