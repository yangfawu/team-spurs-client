import useSelectedGroup from "@/hooks/use-selected-group"
import useSelectedState from "@/hooks/use-selected-state"
import { useGetHeatDistrictMapQuery } from "@/redux/map.api"

export default function LegendModule() {
    const state = useSelectedState()
    const group = useSelectedGroup()
    const { currentData, isSuccess, isFetching } = useGetHeatDistrictMapQuery({
        group,
        state,
    })

    if (isFetching) {
        return (
            <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
                <h3 className="text-lg font-bold">Legend</h3>
                <div className="flex-1 rounded-md bg-gray-300 animate-pulse" />
            </div>
        )
    }

    if (!isSuccess || !currentData) {
        return (
            <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
                <h3 className="text-lg font-bold">Legend</h3>
                <div className="flex-1 bg-red-300 p-4 flex justify-center items-center">
                    <p className="text-center">Error fetching statistics</p>
                </div>
            </div>
        )
    }

    const { min, max } = currentData

    return (
        <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
            <h3 className="text-lg font-bold">Legend</h3>
            <div className="relative min-h-8 bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#deffff] to-[#de3232]" />
            </div>
            <div className="flex justify-between">
                <p>{min}</p>
                <p>{max}</p>
            </div>
        </div>
    )
}
