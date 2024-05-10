import StateGroupBoxPlot from "@/components/modules/state-group-box-plot"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useHeatSettings } from "@/contexts/heat-settings"

export default function BoxPlot() {
    const state = useSafeCurrentState()
    const { group } = useHeatSettings()
    return <StateGroupBoxPlot state={state} group={group} />
}
