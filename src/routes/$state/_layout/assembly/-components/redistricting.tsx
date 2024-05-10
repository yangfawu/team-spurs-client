import StateRedistrictingPower from "@/components/modules/state-redistricting-power"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function Redistricting() {
    const state = useSafeCurrentState()
    return <StateRedistrictingPower state={state} />
}
