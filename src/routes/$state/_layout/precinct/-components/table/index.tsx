import TableLoader from "@/components/loader/table-loader"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Content from "./content"

export default function Table() {
    return (
        <Container>
            <h3 className="p-2 text-lg font-bold">Tabular View</h3>
            <Suspense fallback={<TableLoader />}>
                <Content />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    relative
    h-full min-w-96
    overflow-auto scroll-pt-7
    flex flex-col items-stretch
`
