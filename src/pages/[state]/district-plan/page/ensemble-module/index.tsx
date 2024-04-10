import Group, { GROUP_TO_NAME } from "@/constants/group"
import { useState } from "react"
import ExploreButton from "./explore-button"
import SelectGroup from "./select-group"

export default function EnsembleModule() {
    const [group, setGroup] = useState(Group.WHITE)

    return (
        <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
            <h3 className="text-lg font-bold">Ensemble Summary</h3>
            <div className="flex flex-wrap gap-2">
                <SelectGroup group={group} setGroup={setGroup} />
                <ExploreButton group={group} />
            </div>
            <div className="flex-1 bg-gray-300 p-4 box-border flex items-center justify-center">
                <p className="text-center">box and whisker plot for {GROUP_TO_NAME[group]}</p>
            </div>
        </div>
    )
}
