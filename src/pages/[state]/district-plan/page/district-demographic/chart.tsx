import { GROUP_TO_ABBREV, GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import useSelectedState from "@/hooks/use-selected-state"
import { fetchDistrictsDemographics } from "@/redux/demographic.api"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface Props {
    district: number
}
export default function Chart({ district }: Props) {
    const state = useSelectedState()
    const { currentData, isSuccess, isFetching } = fetchDistrictsDemographics(state)

    const chartData = useMemo(() => {
        if (!currentData) return undefined

        // find the data for the selected district
        const target = currentData.find(({ district: $d }) => $d === district)
        if (!target) return undefined

        const out = []

        // compute the data for the chart
        const { count } = target
        for (const group of SUPPORTED_GROUPS) {
            if (group in count) {
                const name = GROUP_TO_NAME[group]
                const short = GROUP_TO_ABBREV[group]
                out.push({
                    label: { long: name, short },
                    value: count[group],
                })
            }
        }

        // sort the data by value
        out.sort((a, b) => b.value - a.value)

        return out
    }, [currentData, district])

    if (isFetching) {
        return <div className="flex-1 bg-gray-300 animate-pulse p-4" />
    }

    if (!isSuccess || !chartData) {
        return (
            <div className="flex-1 bg-red-300 p-4 flex justify-center items-center">
                <p className="text-center">Error fetching statistics</p>
            </div>
        )
    }

    return (
        <ResponsiveContainer className="flex-1 overflow-clip">
            <BarChart
                width={500}
                height={300}
                data={chartData}
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
                    content={({ active, payload }) => {
                        if (!active || !payload?.[0]) return null

                        const {
                            payload: { label, value },
                        } = payload[0]
                        return (
                            <div className="bg-white shadow p-2">
                                <p>{label.long}</p>
                                <p>
                                    <span className="font-semibold">Count:</span> {value}
                                </p>
                            </div>
                        )
                    }}
                />
                <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}
