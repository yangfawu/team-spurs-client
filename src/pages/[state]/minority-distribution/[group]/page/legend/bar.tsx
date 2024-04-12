import useSelectedGroup from "@/hooks/use-selected-group"
import useSelectedState from "@/hooks/use-selected-state"
import { fetchHeatLegend } from "@/redux/map.api"

export default function Bar() {
    const state = useSelectedState()
    const group = useSelectedGroup()
    const { currentData, isSuccess, isFetching } = fetchHeatLegend({
        group,
        state,
    })

    if (isFetching) {
        return <div className="flex-1 rounded-md bg-gray-300 animate-pulse" />
    }

    if (!isSuccess || !currentData) {
        return (
            <div className="flex-1 bg-red-300 p-4 flex justify-center items-center">
                <p className="text-center">Error fetching statistics</p>
            </div>
        )
    }

    const { min, max } = currentData
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
