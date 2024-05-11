import { fetchHeatMap } from "@/api/heat"
import State from "@/constants/state"
import { useHeatSettings } from "@/contexts/heat-settings"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import Control from "react-leaflet-custom-control"
import tw from "tailwind-styled-components"

interface Props {
    state: State
}
export default function Legend({ state }: Props) {
    const { group, level } = useHeatSettings()
    const {
        data: {
            legend: { bins },
        },
    } = useSuspenseQuery(fetchHeatMap(state, level, group))

    const data = useMemo(() => {
        const min = bins[0].min
        const max = bins[bins.length - 1].max
        return bins.map(({ color, max: v }) => ({
            color,
            value: ((v - min) / (max - min)) * 100,
        }))
    }, [bins])

    return (
        <Control key="legend" position="bottomleft">
            <div className="divide-y group shadow flex flex-col-reverse">
                {data.map(({ color, value }, i) => (
                    <Bin key={i}>
                        <div className="w-8 h-8 border rounded-sm opacity-50" style={{ backgroundColor: color }} />
                        <p className="p-1.5 text-sm">
                            <b>{format(value)}</b>
                        </p>
                    </Bin>
                ))}
            </div>
        </Control>
    )
}

const Bin = tw.div`
    flex items-center gap-1
    bg-white/0
    group-hover:bg-white
    transition-colors
`

const format = (value: number) => `≤ ${+value.toFixed(0)}%`
