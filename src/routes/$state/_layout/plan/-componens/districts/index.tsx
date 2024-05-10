import TableLoader from "@/components/loader/table-loader"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Control from "./control"

export default function Districts() {
    return (
        <Container>
            <div className="p-2 space-y-2">
                <h3 className="text-lg font-bold">Districts</h3>
                <Control />
            </div>
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
