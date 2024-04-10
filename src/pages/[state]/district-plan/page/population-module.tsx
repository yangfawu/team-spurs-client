import useSelectedState from "@/hooks/use-selected-state"
import { fetchStateDemographic } from "@/redux/demographic.api"
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function PopulationModule() {
    const state = useSelectedState()
    const { currentData, isSuccess, isFetching } = fetchStateDemographic(state)

    return (
        <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
            <h3 className="text-lg font-bold">State Population Distribution</h3>
            {isFetching ? (
                <div className="flex-1 bg-gray-300 animate-pulse p-4" />
            ) : isSuccess && currentData ? (
                <ResponsiveContainer className="flex-1 overflow-clip">
                    <BarChart
                        width={500}
                        height={300}
                        data={currentData}
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
