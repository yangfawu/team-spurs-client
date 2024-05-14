import { fetchEcologicalInference } from "@/api/racial"
import { GROUP_TO_NAME } from "@/constants/group"
import Party from "@/constants/party"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import _ from "lodash"
import { Fragment, useMemo } from "react"
import Chart from "./chart"

interface Props {
    state: State
}
export default function Content({ state }: Props) {
    const { data } = useSuspenseQuery(fetchEcologicalInference(state))

    const [bins, categories] = useMemo(() => {
        const { min, max } = data[0]
        const a = _.range(min, max + 1)
        const b = a.map(v => v / max)
        return [a, b] as const
    }, [data])

    const bidenSeries = useMemo(
        () =>
            data
                .filter(({ party }) => party === Party.DEMOCRATIC)
                .map(({ group, values }) => ({
                    name: GROUP_TO_NAME[group],
                    data: bins.map(x => values[x] || 0),
                })),
        [data, bins],
    )

    const trumpSeries = useMemo(
        () =>
            data
                .filter(({ party }) => party === Party.REPUBLICAN)
                .map(({ group, values }) => ({
                    name: GROUP_TO_NAME[group],
                    data: bins.map(x => values[x] || 0),
                })),
        [data, bins],
    )

    return (
        <Fragment key={state}>
            <Chart key="biden" id="biden" categories={categories} series={bidenSeries} title="Support for Biden" />
            <Chart key="trump" id="trump" categories={categories} series={trumpSeries} title="Support for Trump" />
        </Fragment>
    )
}
