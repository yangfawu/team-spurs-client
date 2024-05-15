import ClearButton from "./clear-button"
import ThresholdSelection from "./threshold-selection"

export default function Settings() {
    return (
        <div className="flex gap-2">
            <ThresholdSelection />
            <ClearButton />
        </div>
    )
}
