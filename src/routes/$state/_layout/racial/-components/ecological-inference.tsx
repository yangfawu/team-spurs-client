import StateGroupEIAreaPlot from "@/components/modules/state-group-ei-area-plot"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useHeatSettings } from "@/contexts/heat-settings"

export default function EcologicalInference() {
    const state = useSafeCurrentState()
    const { group } = useHeatSettings()
    return <StateGroupEIAreaPlot state={state} group={group} />
}
