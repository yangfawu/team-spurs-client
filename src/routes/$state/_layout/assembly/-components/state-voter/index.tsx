import AssemblyView, { ASSEMBLY_VIEW_TO_NAME } from "@/constants/assembly-view"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Info from "./info"
import Loader from "./loader"

export default function StateVoter() {
    return (
        <Container>
            <h3 className="text-lg font-bold">{ASSEMBLY_VIEW_TO_NAME[AssemblyView.STATE_VOTER]}</h3>
            <Suspense fallback={<Loader />}>
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
