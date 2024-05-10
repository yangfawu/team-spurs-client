import StateGroupHeatMap from "@/components/modules/state-group-heat-map"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function Map() {
    const state = useSafeCurrentState()
    return <StateGroupHeatMap state={state} />
}
