import AssemblyView, { ASSEMBLY_VIEW_TO_NAME } from "@/constants/assembly-views"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Info from "./info"

export default function Redistricting() {
    return (
        <Container>
            <h3 className="text-lg font-bold">{ASSEMBLY_VIEW_TO_NAME[AssemblyView.REDISTRICTING]}</h3>
            <Suspense>
                <Info />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    h-full
    p-2
    flex flex-col items-stretch gap-2
    overflow-y-auto
`
