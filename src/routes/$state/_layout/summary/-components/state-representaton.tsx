import StateRepresentationBarChart from "@/components/modules/state-representation-bar-chart"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function StateRepresentation() {
    const state = useSafeCurrentState()
    return <StateRepresentationBarChart state={state} />
}
