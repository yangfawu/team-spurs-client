import State from "@/constants/state"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Info from "./info"
import Loader from "./loader"

interface Props {
    state: State
}
export default function StateRedistrictingPower({ state }: Props) {
    return (
        <Container>
            <h3 className="text-lg font-bold">State Redistricting</h3>
            <Suspense fallback={<Loader />}>
                <Info state={state} />
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
