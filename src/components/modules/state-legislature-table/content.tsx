import { fetchRepresentatives } from "@/api/assembly"
import TableLoader from "@/components/loader/table-loader"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense, useMemo } from "react"
import { useFilterContext } from "./context"
import Control from "./control"
import Table from "./table"

interface Props {
    state: State
}
export default function Content({ state }: Props) {
    const { data } = useSuspenseQuery(fetchRepresentatives(state))

    const { groupFilter, partyFilter } = useFilterContext()
    const filteredData = useMemo(() => {
        let final = data
        if (groupFilter.length > 0) {
            final = final.filter(({ race }) => race.some(r => groupFilter.includes(r)))
        }
        if (partyFilter.length > 0) {
            final = final.filter(({ party }) => partyFilter.includes(party))
        }
        return final
    }, [data, groupFilter, partyFilter])

    return (
        <Suspense fallback={<TableLoader />}>
            <Table state={state} data={filteredData} />
            <Control size={filteredData.length} />
        </Suspense>
    )
}
