import { ETHNICITIES } from "@/constants/ethnicities"
import { useState } from "react"
import SelectGroup from "./select-group"
import ExploreButton from "./explore-button"

export default function EnsembleModule() {
    const [group, setGroup] = useState(ETHNICITIES[0])

    return (
        <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
            <h3 className="text-lg font-bold">Ensemble Summary</h3>
            <div className="flex flex-wrap gap-2">
                <SelectGroup group={group} setGroup={setGroup} />
                <ExploreButton group={group.key} />
            </div>
            <div className="flex-1 bg-gray-300 p-4 box-border flex items-center justify-center">
                <p className="text-center">
                    box and whisker plot for {group.name}
                </p>
            </div>
        </div>
    )
}
