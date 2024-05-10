import TableLoader from "@/components/loader/table-loader"
import Group from "@/constants/group"
import State from "@/constants/state"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Content from "./content"

interface Props {
    state: State
    group: Group
}
export default function PrecinctGroupVoteShareTable({ state, group }: Props) {
    return (
        <Container>
            <h3 className="p-2 text-lg font-bold">Precinct Vote Share [2020 Presidential]</h3>
            <Suspense fallback={<TableLoader />}>
                <Content state={state} group={group} />
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
