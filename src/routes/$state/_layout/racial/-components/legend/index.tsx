import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Bins from "./bins"
import Loader from "./loader"
import Title from "./title"

export default function Legend() {
    return (
        <Container>
            <Title />
            <Suspense fallback={<Loader />}>
                <Bins />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    h-full
    p-2
    flex flex-col items-stretch gap-2
    overflow-y-auto
    flex flex-col items-stretch gap-2
`
