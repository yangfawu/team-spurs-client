import { fetchStateDemographic } from "@/api/assembly"
import Group, { GROUP_TO_ABBREV, GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import TooltipContent from "./tooltip-content"

export interface BarData {
    group: Group
    label: {
        long: string
        short: string
    }
    value: number
}

export default function Chart() {
    const state = useSafeCurrentState()
    const { data } = useSuspenseQuery(fetchStateDemographic(state))

    const bars = useMemo(() => {
        const out: BarData[] = []

        // Compute the data for the chart
        const { count } = data
        for (const group of SUPPORTED_GROUPS) {
            if (group in count) {
                const long = GROUP_TO_NAME[group]
                const short = GROUP_TO_ABBREV[group]
                const value = count[group]
                out.push({
                    group,
                    label: { long, short },
                    value,
                })
            }
        }

        // Sort the bars by population
        out.sort((a, b) => b.value - a.value)

        return out
    }, [data])

    return (
        <ResponsiveContainer className="flex-1 overflow-clip">
            <BarChart data={bars}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="label.short" interval={0} />
                <YAxis type="number" tickFormatter={axisFormatter} />
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.[0]) return null

                        const {
                            label: { long },
                            value,
                        } = payload[0].payload as BarData
                        return <TooltipContent title={long} value={value} format={tooltipFormatter} />
                    }}
                />
                <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}

const axisFormatter = (value: any) => Number(value).toPrecision(3)
const tooltipFormatter = (value: any) => Number(value).toLocaleString()
