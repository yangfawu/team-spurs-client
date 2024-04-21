import { fetchHeatMap } from "@/api/heat"
import { useSafeCurrentState } from "@/contexts/current-state"
import { selectGroup, selectLevel } from "@/redux/heat"
import { useAppSelector } from "@/redux/hooks"
import { useSuspenseQuery } from "@tanstack/react-query"
import tw from "tailwind-styled-components"

export default function Bins() {
    const state = useSafeCurrentState()
    const level = useAppSelector(selectLevel)
    const group = useAppSelector(selectGroup)
    const {
        data: {
            legend: { bins },
        },
    } = useSuspenseQuery(fetchHeatMap(state, level, group))

    return (
        <div className="flex gap-2 flex-wrap">
            {bins.map(({ color, max }, i) => (
                <Bin key={i}>
                    <div className="w-4 h-4 border rounded-sm" style={{ backgroundColor: color }} />
                    <p>{format(max)}</p>
                </Bin>
            ))}
        </div>
    )
}

const Bin = tw.div`
    flex items-center gap-1
    p-1.5
    border rounded-sm
`

const format = (value: number) => `≤ ${value.toPrecision(2)}`
