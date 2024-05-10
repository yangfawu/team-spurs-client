import { selectPlan } from "@/redux/compare"
import { useAppSelector } from "@/redux/hooks"
import Layer from "./layer"

export default function SeawulfLayer() {
    const plan = useAppSelector(selectPlan)

    if (!plan) {
        return null
    }

    return <Layer plan={plan} />
}
