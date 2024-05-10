import StateGroupHeatMap from "@/components/modules/state-group-heat-map"
import { useSafeCurrentState } from "@/contexts/current-state"
import { selectGroup, selectLevel } from "@/redux/heat"
import { useAppSelector } from "@/redux/hooks"

export default function Map() {
    const state = useSafeCurrentState()
    const level = useAppSelector(selectLevel)
    const group = useAppSelector(selectGroup)

    return <StateGroupHeatMap state={state} level={level} group={group} />
}
