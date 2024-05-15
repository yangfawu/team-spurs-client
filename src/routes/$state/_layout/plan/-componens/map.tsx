import PlanCompareMap from "@/components/modules/plan-compare-map"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function Map() {
    const state = useSafeCurrentState()
    return <PlanCompareMap state={state} />
}
