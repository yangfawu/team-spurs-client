import { fetchRepresentatives } from "@/api/assembly"
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
    const { data } = useSuspenseQuery(fetchRepresentatives(state))

    const bars = useMemo(() => {
        // @ts-ignore
        const tally: Record<Group, number> = {}
        for (const group of SUPPORTED_GROUPS) {
            tally[group] = 0
        }

        // Tally up representation of each legislature member
        for (const { race } of data) {
            for (const group of race) {
                tally[group]++
            }
        }

        // Compute the data for the chart
        const out: BarData[] = []
        for (const group of SUPPORTED_GROUPS) {
            const long = GROUP_TO_NAME[group]
            const short = GROUP_TO_ABBREV[group]
            const value = tally[group]
            out.push({
                group,
                label: { long, short },
                value,
            })
        }

        // Sort the bars by count
        out.sort((a, b) => b.value - a.value)

        // Filter out bars with no representation
        return out.filter(({ value }) => value > 0) 
    }, [data])

    return (
        <ResponsiveContainer className="flex-1 overflow-clip">
            <BarChart data={bars}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="label.short" interval={0} />
                <YAxis type="number" />
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.[0]) return null

                        const {
                            label: { long },
                            value,
                        } = payload[0].payload as BarData
                        return <TooltipContent title={long} value={value} />
                    }}
                />
                <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}
