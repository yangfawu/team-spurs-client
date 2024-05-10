import StateEnactedDistrictMap from "@/components/modules/state-enacted-district-map"
import { useSafeCurrentState } from "@/contexts/current-state"

export default function Map() {
    const state = useSafeCurrentState()
    return <StateEnactedDistrictMap state={state} />
}
