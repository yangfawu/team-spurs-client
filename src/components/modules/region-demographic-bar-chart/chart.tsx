import Group, { GROUP_TO_ABBREV, GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import { useRegionDemographicShowcase } from "@/contexts/region-demographic-showcase"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import TooltipContent from "./tooltip-content"

export interface BarData {
    group: Group
    label: {
        long: string
        short: string
    }
    value: number
    display: number
}

interface Props {
    group: Group
}
export default function Chart({ group }: Props) {
    const context = useRegionDemographicShowcase()

    const bars = useMemo(() => {
        const out: BarData[] = []

        if (!context?.modal?.breakdown) return out

        const data = context.modal.breakdown

        const maxPop = Object.values(data).reduce((a, b) => a + b, 0)

        // Compute the data for the chart
        for (const group of SUPPORTED_GROUPS) {
            const long = GROUP_TO_NAME[group]
            const short = GROUP_TO_ABBREV[group]
            const value = Math.floor(data[group])
            const display = value / maxPop
            out.push({
                group,
                label: { long, short },
                display,
                value,
            })
        }

        // Sort the bars by count
        out.sort((a, b) => b.value - a.value)

        return out.filter(({ display }) => display > 0.05)
    }, [context])

    return (
        <ResponsiveContainer className="flex-1 overflow-clip">
            <BarChart data={bars}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="label.long" interval={0} />
                <YAxis type="number" min={0} max={1} tickFormatter={yFormatter} />
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
                <Bar dataKey="display">
                    {bars.map(({ group: $g }) => (
                        <Cell key={$g} fill={$g === group ? "red" : "#8884d8"} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

const yFormatter = (v: any) => `${(Number(v) * 100).toFixed(0)}%`
