import BarChartLoader from "@/components/loader/bar-chart-loader"
import AssemblyView, { ASSEMBLY_VIEW_TO_NAME } from "@/constants/assembly-view"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Chart from "./chart"

export default function Representation() {
    return (
        <Container>
            <h3 className="text-lg font-bold">{ASSEMBLY_VIEW_TO_NAME[AssemblyView.REPRESENTATION]}</h3>
            <Suspense fallback={<BarChartLoader />}>
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
