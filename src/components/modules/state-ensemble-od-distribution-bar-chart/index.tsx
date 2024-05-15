import BarChartLoader from "@/components/loader/bar-chart-loader"
import State from "@/constants/state"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Chart from "./chart"
import { ContextProvider } from "./context"
import Settings from "./settings"

interface Props {
    state: State
}
export default function StateEnsembleODDistributionBarChart({ state }: Props) {
    return (
        <Container>
            <ContextProvider>
                <div className="space-y-2 p-2">
                    <h3 className="text-lg font-bold">Ensemble Opportunity District Distribution</h3>
                    <Settings />
                </div>
                <Suspense fallback={<BarChartLoader />}>
                    <Chart state={state} />
                </Suspense>
            </ContextProvider>
        </Container>
    )
}

const Container = tw.div`
    relative
    h-full
    overflow-auto scroll-pt-7
    flex flex-col items-stretch
`
