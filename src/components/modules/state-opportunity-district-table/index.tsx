import TableLoader from "@/components/loader/table-loader"
import State from "@/constants/state"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import { ContextProvider } from "./context"
import Settings from "./settings"
import Table from "./table"

interface Props {
    state: State
}
export default function StateOpportunityDistrictTable({ state }: Props) {
    return (
        <Container>
            <ContextProvider>
                <div className="space-y-2 p-2">
                    <h3 className="text-lg font-bold">State Opportunity Districts</h3>
                    <Settings />
                </div>
                <Suspense fallback={<TableLoader />}>
                    <Table state={state} />
                </Suspense>
            </ContextProvider>
        </Container>
    )
}

const Container = tw.div`
    relative
    h-full
    overflow-auto scroll-pt-7
    flex flex-col items-stretch
`
