import { SUPPORTED_ETHNICITY_DIRECTORY, SupportedEthnicityKey } from "@/constants/ethnicities"
import { SupportedStateKey } from "@/constants/states"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type RawOverallDemographicsResponse = {
    label: string
    population: number
    percent_makeup: number
    state: string
}[]

type OverallDemographicsResponse = {
    mongoKey: string
    groupKey: SupportedEthnicityKey
    label: {
        long: string
        short: string
    }
    count: number
}[]

interface OverallGroupDemographicsPayload {
    state: SupportedStateKey
    group: SupportedEthnicityKey
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

const MongoKeyToClientKey: Record<string, SupportedEthnicityKey> = {
    hawaiian_pacific_islander: "hpi",
    hispanic_latino: "hl",
    asian: "asian",
    black: "black",
    white: "white",
    american_indian_alaska_native: "aian",
    other: "other",
    mixed: "mixed",
}

export const distributionApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/distribution`,
    }),
    reducerPath: "distribution-api",
    tagTypes: ["Overall", "Group-Overall", "District"],
    endpoints: build => ({
        getOverallDemographicsByState: build.query<OverallDemographicsResponse, SupportedStateKey>({
            query: state => `/overall/${state}`,
            transformResponse(base: RawOverallDemographicsResponse) {
                const out: OverallDemographicsResponse = []

                // build results
                let max_population = 0
                for (const { label: mongoKey, population: count } of base) {
                    if (!(mongoKey in MongoKeyToClientKey)) continue

                    max_population = Math.max(max_population, count)

                    const groupKey = MongoKeyToClientKey[mongoKey]
                    const long = SUPPORTED_ETHNICITY_DIRECTORY[groupKey]
                    const short = long.length < 5 ? long : `${long.slice(0, 3)}...`
                    const label = { long, short }
                    
                    out.push({ count, groupKey, mongoKey, label })
                }

                // sort by population asc
                out.sort((a, b) => a.count - b.count)

                // filter out anything under the threshold
                const threshold = 0.01 * max_population
                return out.filter(({ count }) => count >= threshold)
            },
            providesTags: (_, __, id) => [{ type: "Overall", id }],
        }),
        getOverallGroupDemographicsByState: build.query<any, OverallGroupDemographicsPayload>({
            query: state => `/overall/${state}`,
            providesTags: (_, __, { group, state }) => [{ type: "Overall", id: `${state}-${group}` }],
        }),
        getDistrictDemographicsByState: build.query<DistrictDemographicsResponse, SupportedStateKey>({
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
