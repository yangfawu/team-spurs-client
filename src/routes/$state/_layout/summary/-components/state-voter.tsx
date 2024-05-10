import StateVoterBreakdown from "@/components/modules/state-voter-breakdown"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function StateVoter() {
    const state = useSafeCurrentState()
    return <StateVoterBreakdown state={state} />
}
