import { SupportedStateKey } from "@/constants/states"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface CountiesApiResponse {
    type: string
    features: GeoJSON.Feature[]
}

export const countiesApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://raw.githubusercontent.com/yangfawu/cse416-data/main`,
    }),
    reducerPath: "counties-api",
    tagTypes: ["Counties"],
    endpoints: build => ({
        // Supply generics for the return type (in this case `QuotesApiResponse`)
        // and the expected query argument. If there is no argument, use `void`
        // for the argument type instead.
        getCounties: build.query<CountiesApiResponse, SupportedStateKey>({
            query: state => {
                switch (state) {
                    case "nj":
                        return `/nj-legislative-district-plans.geojson`
                    case "va":
                        return `/va-legislative-district-plans.geojson`
                }
            },
            providesTags: (_, __, id) => [{ type: "Counties", id }],
        }),
    }),
})

export const { useGetCountiesQuery, useLazyGetCountiesQuery } = countiesApiSlice
