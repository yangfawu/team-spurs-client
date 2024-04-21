import Group, { GROUP_TO_ABBREV, GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import { selectGroup } from "@/redux/heat"
import { useAppSelector } from "@/redux/hooks"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import TooltipContent from "./tooltip-content"

export interface BarData {
    group: Group
    label: {
        long: string
        short: string
    }
    value: number
}

interface Props {
    data: Record<Group, number>
}
export default function Chart({ data }: Props) {
    const group = useAppSelector(selectGroup)

    const bars = useMemo(() => {
        // Compute the data for the chart
        const out: BarData[] = []
        for (const group of SUPPORTED_GROUPS) {
            const long = GROUP_TO_NAME[group]
            const short = GROUP_TO_ABBREV[group]
            const value = data[group]
            out.push({
                group,
                label: { long, short },
                value,
            })
        }

        // Sort the bars by count
        out.sort((a, b) => b.value - a.value)

        return out
    }, [data])

    return (
        <ResponsiveContainer className="flex-1 overflow-clip">
            <BarChart data={bars}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="label.short" interval={0} />
                <YAxis type="number" tickFormatter={format} />
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload?.[0]) return null

                        const {
                            label: { long },
                            value,
                        } = payload[0].payload as BarData
                        return <TooltipContent title={long} value={value} format={format} />
                    }}
                />
                <Bar dataKey="value" activeBar={<Rectangle fill="pink" stroke="blue" />}>
                    {bars.map(({ group: $g }) => (
                        <Cell key={$g} fill={$g === group ? "red" : "#8884d8"} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

const format = (value: any) => Number(value).toPrecision(3)
