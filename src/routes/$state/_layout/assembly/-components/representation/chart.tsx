import { fetchRepresentatives, fetchStateDemographic } from "@/api/assembly"
import Group, { GROUP_TO_ABBREV, GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import TooltipContent from "./tooltip-content"

export interface BarData {
    group: Group
    label: {
        long: string
        short: string
    }
    display: {
        reps: number
        pop: number
    }
    value: {
        reps: number
        pop: number
    }
}

export default function Chart() {
    const state = useSafeCurrentState()
    const { data: repsData } = useSuspenseQuery(fetchRepresentatives(state))
    const { data: demoData } = useSuspenseQuery(fetchStateDemographic(state))

    const repsTally: Record<Group, number> = useMemo(() => {
        // @ts-ignore
        const tally: Record<Group, number> = {}
        for (const group of SUPPORTED_GROUPS) {
            tally[group] = 0
        }

        for (const { race } of repsData) {
            for (const group of race) {
                tally[group]++
            }
        }

        return tally
    }, [repsData])

    const demoTally: Record<Group, number> = useMemo(() => {
        return demoData.count
    }, [demoData])

    const bars = useMemo(() => {
        const out: BarData[] = []

        const maxPop = Object.values(demoTally).reduce((a, b) => a + b, 0)
        const maxReps = Object.values(repsTally).reduce((a, b) => a + b, 0)

        for (const group of SUPPORTED_GROUPS) {
            const long = GROUP_TO_NAME[group]
            const short = GROUP_TO_ABBREV[group]
            const reps = repsTally[group]
            const pop = demoTally[group]
            out.push({
                group,
                label: { long, short },
                display: {
                    reps: reps / maxReps,
                    pop: pop / maxPop,
                },
                value: {
                    reps,
                    pop,
                },
            })
        }

        out.sort((a, b) => b.value.pop - a.value.pop)

        return out.filter(({ display }) => display.pop > 0.05)
    }, [repsData, demoData])

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
                        return <TooltipContent title={long} {...value} />
                    }}
                />
                <Bar dataKey="display.pop" fill="#8884d8" name="Population" />
                <Bar dataKey="display.reps" fill="#82ca9d" name="Representatives" />
                <Legend verticalAlign="bottom" height={36}/>
            </BarChart>
        </ResponsiveContainer>
    )
}

const yFormatter = (v: any) => `${(Number(v) * 100).toFixed(0)}%`
