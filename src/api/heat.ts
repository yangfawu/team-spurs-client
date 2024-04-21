import Group from "@/constants/group"
import HeatLevel from "@/constants/heat-level"
import State from "@/constants/state"
import { queryOptions } from "@tanstack/react-query"

export interface HeatMapFeature extends GeoJSON.Feature<GeoJSON.Geometry, any> {
    id: string
    state: State
    level: HeatLevel
    bins: Record<Group, number>
    title: string
    demographic: Record<Group, number>
}

export interface HeatMapLegend {
    id: string
    state: State
    group: Group
    level: HeatLevel
    bins: {
        color: string
        min: number
        max: number
    }[]
}

export interface HeatMap {
    features: HeatMapFeature[]
    legend: HeatMapLegend
}

const NAME = "heat"
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${NAME}`

export function fetchHeatMap(state: State, level: HeatLevel, group: Group) {
    return queryOptions<HeatMap>({
        queryKey: [NAME, "fetchHeatMap", state, level, group],
        queryFn: async ({ signal }) => {
            return {
                features: [
                    {
                        id: "123",
                        state,
                        level,
                        title: "District 1",
                        type: "Feature",
                        geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-75.5636, 38.9283],
                                    [-75.5636, 41.3572],
                                    [-73.8851, 41.3572],
                                    [-73.8851, 38.9283],
                                    [-75.5636, 38.9283]
                                ],
                            ],
                        },
                        properties: {},
                        bins: {
                            [Group.WHITE]: 7,
                            [Group.BLACK]: 3,
                            [Group.ASIAN]: 1,
                            [Group.HISPANIC_LATINO]: 2,
                            [Group.AMERICAN_INDIAN_ALASKA_NATIVE]: 2,
                            [Group.HAWAIIAN_PACIFIC_ISLANDER]: 0,
                            [Group.MIXED]: 0,
                            [Group.OTHER]: 0,
                        },
                        demographic: {
                            [Group.WHITE]: 2.3e5,
                            [Group.BLACK]: 2e5,
                            [Group.ASIAN]: 1.5e5,
                            [Group.HISPANIC_LATINO]: 1.2e5,
                            [Group.AMERICAN_INDIAN_ALASKA_NATIVE]: 9e4,
                            [Group.HAWAIIAN_PACIFIC_ISLANDER]: 6e4,
                            [Group.MIXED]: 3e4,
                            [Group.OTHER]: 0,
                        },
                    },
                ],
                legend: {
                    id: "$ewsd123123sd",
                    state,
                    group,
                    level,
                    bins: [
                        { color: "#ffffff", min: 0, max: 3e4 },
                        { color: "#f0f0f0", min: 3e4, max: 6e4 },
                        { color: "#d9d9d9", min: 6e4, max: 9e4 },
                        { color: "#bdbdbd", min: 9e4, max: 1.2e5 },
                        { color: "#969696", min: 1.2e5, max: 1.5e5 },
                        { color: "#737373", min: 1.5e5, max: 1.8e5 },
                        { color: "#525252", min: 1.8e5, max: 2.1e5 },
                        { color: "#252525", min: 2.1e5, max: 2.4e5 },
                        { color: "#000000", min: 2.4e5, max: 2.7e5 },
                    ],
                },
            }
            // TODO: uncomment when endpoint is ready
            // const res = await fetch(`${BASE_URL}/${state}/${level}/${group}`, { signal })
            // const data: HeatMap = await res.json()
            // return data
        },
    })
}
