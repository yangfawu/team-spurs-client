import { fetchOpportunityDistrictDistribution } from "@/api/summary"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useSettingsContext } from "./context"

interface Props {
    state: State
}
export default function Chart({ state }: Props) {
    const { group, threshold } = useSettingsContext()
    const { data } = useSuspenseQuery(fetchOpportunityDistrictDistribution(state, group, threshold))

    const sortedData = useMemo(() => {
        const out = data.slice()
        out.sort((a, b) => a.districts - b.districts)
        return out
    }, [data])

    return (
        <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedData} margin={{ top: 15, right: 30, left: 30, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="category" dataKey="districts" interval={0}>
                        <Label position="bottom" value="Number of Districts" />
                    </XAxis>
                    <YAxis type="number">
                        <Label angle={270} position="left" style={{ textAnchor: "middle" }} value="Number of Plans" />
                    </YAxis>
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Bar dataKey="plans" fill="#8884d8" name="# Plans" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
