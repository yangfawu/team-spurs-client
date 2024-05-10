import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { clearPrecinct, selectPrecinct } from "@/redux/precinct"
import { useCallback } from "react"
import Action from "./action"

export default function ClearPrecinctAction() {
    const dispatch = useAppDispatch()
    const precinct = useAppSelector(selectPrecinct)

    const clear = useCallback(() => {
        dispatch(clearPrecinct())
    }, [])

    if (!precinct) return null

    return (
        <div className="justify-end">
            <Action onClick={clear}>clear precinct</Action>
        </div>
    )
}
