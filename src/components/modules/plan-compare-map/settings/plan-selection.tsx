import { fetchSeawulfPlanOptions } from "@/api/plan"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useCompareContext } from "../context"
import Dropdown from "./dropdown"

interface Props {
    state: State
}
export default function PlanSelection({ state }: Props) {
    const { plan, setPlan } = useCompareContext()

    const { data } = useSuspenseQuery(fetchSeawulfPlanOptions(state))

    const options = useMemo(() => data.map(({ plan }) => plan), [data])

    return <Dropdown value={plan} setValue={setPlan} options={options} tag="Plan" format={format} />
}

const format = (plan: number | null) => (plan === null ? "None" : `#${plan}`)
