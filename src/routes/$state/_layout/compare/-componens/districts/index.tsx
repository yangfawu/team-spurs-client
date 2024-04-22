import TableLoader from "@/components/loader/table-loader"
import { Suspense } from "react"
import tw from "tailwind-styled-components"

export default function Districts() {
    return (
        <Container>
            <h3 className="text-lg font-bold p-2">Districts</h3>
            <Suspense fallback={<TableLoader />}>
                <TableLoader />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    relative
    h-full
    overflow-auto scroll-pt-7
    flex flex-col items-stretch
`
