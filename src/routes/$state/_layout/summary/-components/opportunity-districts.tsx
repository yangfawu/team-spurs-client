import StateOpportunityDistrictTable from "@/components/modules/state-opportunity-district-table"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function OpportunityDistricts() {
    const state = useSafeCurrentState()
    return <StateOpportunityDistrictTable state={state} />
}
