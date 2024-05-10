import BarChartLoader from "@/components/loader/bar-chart-loader"
import State from "@/constants/state"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Chart from "./chart"

interface Props {
    state: State
}
export default function StateRepresentationBarChart({ state }: Props) {
    return (
        <Container>
            <h3 className="text-lg font-bold">State Representation</h3>
            <Suspense fallback={<BarChartLoader />}>
                <Chart state={state} />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    h-full
    p-2
    flex flex-col items-stretch gap-2
`
