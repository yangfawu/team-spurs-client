import { fetchSeawulfPlanOptions } from "@/api/compare"
import { useSafeCurrentState } from "@/contexts/current-state"
import { selectPlan, setPlan } from "@/redux/compare"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import Dropdown from "./dropdown"

export default function Control() {
    const state = useSafeCurrentState()
    const { data: options } = useSuspenseQuery(fetchSeawulfPlanOptions(state))

    const plan = useAppSelector(selectPlan)

    const dispatch = useAppDispatch()
    const updatePlan = useMemo(() => {
        return (plan: string) => dispatch(setPlan(plan))
    }, [])

    return <Dropdown tag="Plan" options={options} value={plan} setValue={updatePlan} />
}
