import { fetchStateDemographic } from "@/api/assembly"
import { SUPPORTED_GROUPS } from "@/constants/group"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export default function Aggregate() {
    const state = useSafeCurrentState()
    const { data } = useSuspenseQuery(fetchStateDemographic(state))

    const total = useMemo(() => {
        let sum = 0
        for (const group of SUPPORTED_GROUPS) {
            if (group in data.count) {
                sum += data.count[group]
            }
        }

        return sum
    }, [data])

    return (
        <p className="text-right text-sm italic">
            Total: <b>{total.toPrecision(3)}</b>
        </p>
    )
}
