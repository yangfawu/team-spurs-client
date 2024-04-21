import { resetFilters, selectLegislature } from "@/redux/assembly"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useCallback } from "react"
import Action from "./action"

export default function ClearFiltersAction() {
    const dispatch = useAppDispatch()
    const { groups, parties } = useAppSelector(selectLegislature)

    const clear = useCallback(() => {
        dispatch(resetFilters())
    }, [])

    if (groups.length == 0 && parties.length == 0) return null

    return (
        <div>
            <Action onClick={clear}>clear filters</Action>
        </div>
    )
}
