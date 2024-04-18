import { fetchGroupHeatMapLegend } from "@/api/map"
import { useSafeCurrentGroup } from "@/contexts/current-group"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function Bar() {
    const state = useSafeCurrentState()
    const group = useSafeCurrentGroup()
    const {
        data: { min, max },
    } = useSuspenseQuery(fetchGroupHeatMapLegend(state, group))

    return (
        <>
            <div className="relative min-h-8 bg-gray-100 rounded-lg border-gray-300 border-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#fff] to-[#f00]" />
            </div>
            <div className="flex justify-between">
                <p>{min}</p>
                <p>{max}</p>
            </div>
        </>
    )
}
