import { useThresholdContext } from "../context"
import Dropdown from "./dropdown"

export default function ThresholdSelection() {
    const { threshold, setThreshold } = useThresholdContext()

    return (
        <Dropdown
            value={threshold}
            setValue={setThreshold}
            options={[37, 45, 50]}
            tag="Threshold"
            format={formatThreshold}
        />
    )
}

const formatThreshold = (value: number) => `${value}%`
