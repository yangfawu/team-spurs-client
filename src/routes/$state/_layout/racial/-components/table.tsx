import PrecinctGroupVoteShareTable from "@/components/modules/precinct-group-vote-share-table"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useHeatSettings } from "@/contexts/heat-settings"

export default function Table() {
    const state = useSafeCurrentState()
    const { group } = useHeatSettings()
    return <PrecinctGroupVoteShareTable state={state} group={group} />
}
