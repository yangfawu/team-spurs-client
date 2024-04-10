import { GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import useSelectedState from "@/hooks/use-selected-state"
import { useGetDistrictDemographicsByStateQuery } from "@/redux/distribution.api"
import { selectApp } from "@/redux/district-plan.slice"
import { useAppSelector } from "@/redux/hooks"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function DistrictModule() {
    const state = useSelectedState()
    const { currentData, isSuccess, isFetching } = useGetDistrictDemographicsByStateQuery(state)

    const { district: selectedDistrict } = useAppSelector(selectApp)

    const data = useMemo(() => {
        if (selectedDistrict === undefined) return []
        if (!currentData) return []

        const target = currentData.find(({ districtId }) => districtId === selectedDistrict)
        if (!target) return []

        const out = []

        let max_population = 0
        for (const key of SUPPORTED_GROUPS) {
            const long = GROUP_TO_NAME[key]
            const count = target[key] || 0
            max_population = Math.max(max_population, count)

            const short = long.length < 5 ? long : `${long.slice(0, 3)}...`
            const label = { long, short }

            out.push({ count, label })
        }

        // sort by population asc
        out.sort((a, b) => a.count - b.count)

        // filter out anything under the threshold
        const threshold = 0.01 * max_population
        return out.filter(({ count }) => count >= threshold)
    }, [currentData, selectedDistrict])

    if (selectedDistrict === undefined) {
        return (
            <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
                <h3 className="text-lg font-bold">District Distribution</h3>
                <div className="flex-1 bg-gray-300 p-4 flex justify-center items-center">
                    <p className="text-center">Select a district to see data.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
            <h3 className="text-lg font-bold">
                {selectedDistrict !== undefined ? `District ${selectedDistrict} Distribution` : "District Distribution"}
            </h3>
            {isFetching ? (
                <div className="flex-1 bg-gray-300 animate-pulse p-4" />
            ) : isSuccess && data.length > 0 ? (
                <ResponsiveContainer className="flex-1 overflow-clip">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label.short" interval={0} />
                        <YAxis />
                        <Tooltip
                            content={({ active, payload }) =>
                                active &&
                                payload?.[0] && (
                                    <div className="bg-white shadow p-2">
                                        <p>{payload[0].payload.label.long}</p>
                                        <p>
                                            <span className="font-semibold">Count:</span> {payload[0].payload.count}
                                        </p>
                                    </div>
                                )
                            }
                        />
                        <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex-1 bg-red-300 p-4 flex justify-center items-center">
                    <p className="text-center">Error fetching statistics</p>
                </div>
            )}
        </div>
    )
}
