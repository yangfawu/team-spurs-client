import GinglesScatterPlot from "@/components/modules/gingles-scatter-plot"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useHeatSettings } from "@/contexts/heat-settings"

export default function ScatterPlot() {
    const state = useSafeCurrentState()
    const { group } = useHeatSettings()
    return <GinglesScatterPlot state={state} group={group} />
}
