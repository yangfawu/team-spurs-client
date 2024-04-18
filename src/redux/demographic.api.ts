import { DistrictDemographic } from "@/api/demographic"
import { StateDemographic } from "@/api/demographic"
import State from "@/constants/state"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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
