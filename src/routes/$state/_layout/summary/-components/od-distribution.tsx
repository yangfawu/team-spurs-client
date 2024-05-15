import StateEnsembleODDistributionBarChart from "@/components/modules/state-ensemble-od-distribution-bar-chart"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function ODDistribution() {
    const state = useSafeCurrentState()
    return <StateEnsembleODDistributionBarChart state={state} />
}
