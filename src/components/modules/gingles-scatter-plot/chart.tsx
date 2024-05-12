import { fetchPrecinctAnalysis } from "@/api/precinct"
import Group, { GROUP_TO_NAME } from "@/constants/group"
import Party from "@/constants/party"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import _ from "lodash"
import { useMemo } from "react"
import ApexCharts from "react-apexcharts"

interface Props {
    state: State
    group: Group
}
export default function Chart({ state, group }: Props) {
    const { data } = useSuspenseQuery(fetchPrecinctAnalysis(state, group))

    const [demScatterPoints, repScatterPoints, demLinePoints, repLinePoints] = useMemo(() => {
        const { rows, lines } = data

        const sampleRows = _.sampleSize(rows, Math.min(200, rows.length))

        const democratPrecinctPoints = sampleRows.map(({ percent_group: x, percent_democrat: y }) => ({ x, y }))
        const republicanPrecinctPoints = sampleRows.map(({ percent_group: x, percent_republican: y }) => ({ x, y }))
        console.log(republicanPrecinctPoints)

        const dx =
            sampleRows.map(({ percent_group }) => percent_group).reduce((a, b) => Math.max(a, b), 0) / REGRESSION_STEPS

        const democratRegressionLine = lines.find(({ party }) => party === Party.DEMOCRATIC)!
        const democratRegressionPoints = computeRegressionPoints(
            createPolynomialFunction(democratRegressionLine.coefficients),
            REGRESSION_STEPS,
            dx,
        )

        const republicanRegressionLine = lines.find(({ party }) => party === Party.REPUBLICAN)!
        const republicanRegressionPoints = computeRegressionPoints(
            createPolynomialFunction(republicanRegressionLine.coefficients),
            REGRESSION_STEPS,
            dx,
        )

        return [
            democratPrecinctPoints,
            republicanPrecinctPoints,
            democratRegressionPoints,
            republicanRegressionPoints,
        ] as const
    }, [data, REGRESSION_STEPS])

    return (
        <div className="flex-1">
            <ApexCharts
                height="100%"
                type="line"
                options={{
                    chart: {
                        animations: {
                            enabled: false,
                        },
                        zoom: {
                            enabled: false,
                        },
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    theme: {
                        mode: "light",
                    },
                    fill: {
                        type: "solid",
                    },
                    stroke: {
                        width: 2,
                        curve: "straight",
                    },
                    markers: {
                        size: [4, 0, 4, 0],
                    },
                    tooltip: {
                        shared: false,
                        intersect: true,
                        x: {
                            formatter: value => `${+(value * 100).toFixed(2)}% ${GROUP_TO_NAME[group]}`,
                        },
                        y: {
                            formatter: value => `${+(value * 100).toFixed(2)}%`,
                        },
                    },
                    xaxis: {
                        type: "numeric",
                        min: 0,
                        title: {
                            text: `% ${GROUP_TO_NAME[group]}`,
                        },
                        labels: {
                            formatter: value => `${+(+value * 100).toFixed(2)}%`,
                        },
                    },
                    yaxis: {
                        min: 0,
                        title: {
                            text: "% Vote Share",
                        },
                        labels: {
                            formatter: (value: number) => `${(value * 100).toFixed(0)}%`,
                        },
                    },
                    legend: {
                        position: "top",
                        horizontalAlign: "center",
                        labels: {
                            useSeriesColors: false,
                        },
                    },
                }}
                series={[
                    {
                        name: "Democratic Vote Share",
                        type: "scatter",
                        data: demScatterPoints,
                        color: "#55f",
                    },
                    {
                        name: "Democratic Curve",
                        type: "line",
                        data: demLinePoints,
                        color: "#00f",
                    },
                    {
                        name: "Republican Vote Share",
                        type: "scatter",
                        data: repScatterPoints,
                        color: "#f55",
                    },
                    {
                        name: "Republican Curve",
                        type: "line",
                        data: repLinePoints,
                        color: "#f00",
                    },
                ]}
            />
        </div>
    )
}

const REGRESSION_STEPS = 5e1

const createPolynomialFunction = (coeffs: number[]) => {
    return (x: number) => {
        let x_i = 1
        return coeffs.reduce((acc, c) => {
            acc += c * x_i
            x_i *= x
            return acc
        }, 0)
    }
}

const computeRegressionPoints = (f: (x: number) => number, steps: number, dx: number) => {
    return Array.from({ length: steps + 1 }, (_, i) => {
        const x = dx * i
        const y = f(x)
        return { x, y }
    })
}
