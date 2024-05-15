import GroupSelection from "./group-selection"
import ThresholdSelection from "./threshold-selection"

export default function Settings() {
    return (
        <div className="flex gap-2">
            <ThresholdSelection />
            <GroupSelection />
        </div>
    )
}
