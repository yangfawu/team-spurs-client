import StateLegislatureTable from "@/components/modules/state-legislature-table"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function Legislature() {
    const state = useSafeCurrentState()
    return <StateLegislatureTable state={state} />
}
