import { useMapFocus } from "@/contexts/map-focus"
import { useCallback } from "react"
import Action from "./action"

export default function UnselectDistrictAction() {
    const context = useMapFocus()

    const deselect = useCallback(() => {
        context?.setFocus(null)
    }, [context])

    if (!context?.focus) return null

    return (
        <div>
            <Action onClick={deselect}>unselect district {context.focus}</Action>
        </div>
    )
}
