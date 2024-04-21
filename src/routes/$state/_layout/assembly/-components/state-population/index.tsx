import TableLoader from "@/components/loader/table-loader"
import AssemblyView, { ASSEMBLY_VIEW_TO_NAME } from "@/constants/assembly-views"
import { Suspense } from "react"
import Chart from "./chart"
import tw from "tailwind-styled-components"

export default function StatePopulation() {
    return (
        <Container>
            <h3 className="text-lg font-bold">{ASSEMBLY_VIEW_TO_NAME[AssemblyView.STATE_POPULATION]}</h3>
            <Suspense fallback={<TableLoader />}>
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