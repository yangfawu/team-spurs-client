import { useCallback } from "react"
import { useFilterContext } from "../context"
import Action from "./action"

export default function ClearFiltersAction() {
    const { groupFilter, partyFilter, setGroupFilter, setPartyFilter } = useFilterContext()

    const clear = useCallback(() => {
        setGroupFilter([])
        setPartyFilter([])
    }, [])

    if (groupFilter.length < 1 && partyFilter.length < 1) return null

    return (
        <div>
            <Action onClick={clear}>clear filters</Action>
        </div>
    )
}
