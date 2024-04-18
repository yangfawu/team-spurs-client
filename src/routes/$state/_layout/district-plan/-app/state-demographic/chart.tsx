import { fetchStateDemographic } from "@/api/demographic"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function Chart() {
    const state = useSafeCurrentState()
    const { data } = useSuspenseQuery(fetchStateDemographic(state))

    return (
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
