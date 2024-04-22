import BarChartLoader from "@/components/loader/bar-chart-loader"
import AssemblyView, { ASSEMBLY_VIEW_TO_NAME } from "@/constants/assembly-view"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Aggregate from "./aggregate"
import Chart from "./chart"

export default function StatePopulation() {
    return (
        <Container>
            <h3 className="text-lg font-bold">{ASSEMBLY_VIEW_TO_NAME[AssemblyView.STATE_POPULATION]}</h3>
            <Suspense fallback={<BarChartLoader />}>
                <Aggregate />
                <Chart />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    h-full
    p-2
    flex flex-col items-stretch gap-2
`
