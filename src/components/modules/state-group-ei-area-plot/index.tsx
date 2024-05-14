import BarChartLoader from "@/components/loader/bar-chart-loader"
import State from "@/constants/state"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Content from "./content"

interface Props {
    state: State
}
export default function StateGroupEIAreaPlot({ state }: Props) {
    return (
        <Container>
            <h3 className="text-lg font-bold">Ecological Inference [2020 Presidential]</h3>
            <Suspense fallback={<BarChartLoader />}>
                <Content state={state} />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    h-full
    p-2
    flex flex-col items-stretch gap-2
`
