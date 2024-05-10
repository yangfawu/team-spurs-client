import BarChartLoader from "@/components/loader/bar-chart-loader"
import Group from "@/constants/group"
import State from "@/constants/state"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Chart from "./chart"

interface Props {
    state: State
    group: Group
}
export default function GinglesScatterPlot({ state, group }: Props) {
    return (
        <Container>
            <h3 className="text-lg font-bold">Gingles Analysis [2020 Presidential]</h3>
            <Suspense fallback={<BarChartLoader />}>
                <Chart state={state} group={group} />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    h-full
    p-2
    flex flex-col items-stretch gap-2
`
