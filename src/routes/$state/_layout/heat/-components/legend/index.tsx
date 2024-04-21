import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Bins from "./bins"
import Loader from "./loader"

export default function Legend() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Legend</h3>
            <Suspense fallback={<Loader />}>
                <Bins />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    flex-1
    p-2
    flex flex-col items-stretch gap-2
`
