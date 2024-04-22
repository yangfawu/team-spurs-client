import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Loader from "./loader"

export default function Precincts() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Precincts</h3>
            <Suspense fallback={<Loader />}>
                <Loader />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    h-full
    p-2
    flex flex-col items-stretch gap-2
`
