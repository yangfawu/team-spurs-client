import { fetchRepresentatives } from "@/api/representative"
import TableLoader from "@/components/loader/table-loader"
import { useSafeCurrentState } from "@/contexts/current-state"
import { selectLegislature } from "@/redux/assembly"
import { useAppSelector } from "@/redux/hooks"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense, useMemo } from "react"
import tw from "tailwind-styled-components"
import Control from "./control"
import Table from "./table"

export default function Legislature() {
    const state = useSafeCurrentState()
    const { data } = useSuspenseQuery(fetchRepresentatives(state))

    const { groups, parties } = useAppSelector(selectLegislature)
    const filteredData = useMemo(() => {
        let final = data
        if (groups.length > 0) {
            final = final.filter(({ race }) => race.some(r => groups.includes(r)))
        }
        if (parties.length > 0) {
            final = final.filter(({ party }) => parties.includes(party))
        }
        return final
    }, [data, groups, parties])

    return (
        <Container>
            <h3 className="p-2 text-lg font-bold">State Assembly Members</h3>
            <Suspense fallback={<TableLoader />}>
                <Table data={filteredData} />
                <Control size={filteredData.length} />
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
