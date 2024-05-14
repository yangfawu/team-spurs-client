import StateGroupEIAreaPlot from "@/components/modules/state-group-ei-area-plot"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function EcologicalInference() {
    const state = useSafeCurrentState()
    return <StateGroupEIAreaPlot state={state} />
}
