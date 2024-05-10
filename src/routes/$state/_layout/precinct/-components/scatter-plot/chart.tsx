import { fetchPrecinctAnalysis } from "@/api/precinct"
import { GROUP_TO_NAME } from "@/constants/group"
import Party from "@/constants/party"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useAppSelector } from "@/redux/hooks"
import { selectGroup } from "@/redux/precinct"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Chart as ChartJS } from "chart.js"
import "chart.js/auto"
import annotationPlugin from "chartjs-plugin-annotation"
import _ from "lodash"
import { useMemo } from "react"
import { Scatter } from "react-chartjs-2"

ChartJS.register(annotationPlugin)
export default function Chart() {
    const state = useSafeCurrentState()
    const group = useAppSelector(selectGroup)
    const { data } = useSuspenseQuery(fetchPrecinctAnalysis(state, group))

    const composedData = useMemo(() => {
        const { rows, lines } = data

        const sampleRows = _.sampleSize(rows, Math.min(200, rows.length))

        const democratPrecinctPoints = sampleRows.map(
            ({ percent_group, percent_democrat }) => [percent_group, percent_democrat] as const,
        )
        const republicanPrecinctPoints = sampleRows.map(
            ({ percent_group, percent_republican }) => [percent_group, percent_republican] as const,
        )

        const dx = sampleRows.map(({ percent_group }) => percent_group).reduce((a, b) => Math.max(a, b), 0) / 1e2

        const democratRegressionLine = lines.find(({ party }) => party === Party.DEMOCRAT)!
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

        return {
            datasets: [
                {
                    label: "Democratic Vote Share",
                    data: democratPrecinctPoints,
                    backgroundColor: "#00f5",
                },
                {
                    label: "Democratic Line",
                    data: democratRegressionPoints,
                    type: "line",
                    borderColor: "#00f",
                    borderWidth: 4,
                    fill: false,
                    showLine: true,
                    pointRadius: 0,
                },
                {
                    label: "Republican Vote Share",
                    data: republicanPrecinctPoints,
                    backgroundColor: "#f005",
                },
                {
                    label: "Republican Line",
                    data: republicanRegressionPoints,
                    type: "line",
                    borderColor: "#f00",
                    borderWidth: 4,
                    fill: false,
                    showLine: true,
                    pointRadius: 0,
                },
            ],
        }
    }, [data])

    const options = useMemo(() => {
        const xAxisLabel = `% ${GROUP_TO_NAME[group]}`
        const yAxisLabel = "Vote Share"
        return {
            responsive: true,
            scales: {
                x: {
                    type: "linear",
                    position: "bottom",
                    title: {
                        display: true,
                        text: xAxisLabel,
                    },
                    ticks: {
                        min: 0,
                        callback: (value: number) => `${value * 100}%`,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        min: 0,
                        max: 1,
                        callback: (value: number) => `${value * 100}%`,
                    },
                    title: {
                        display: true,
                        text: yAxisLabel,
                    },
                },
            },
            plugins: {
                legend: {
                    position: "bottom",
                },
                tooltip: {
                    callbacks: {
                        label: (context: any) => {
                            const [x, y] = context.raw as [number, number]
                            const label = context.dataset.label as string
                            return `${label}: (${(x * 100).toPrecision(3)}%, ${(y * 100).toPrecision(3)}%)`
                        },
                    },
                },
            },
            maintainAspectRatio: false,
        }
    }, [group])

    return (
        <div className="flex-1 overflow-hidden">
            {/* @ts-ignore */}
            <Scatter data={composedData} options={options} width="100%" />
        </div>
    )
}

const REGRESSION_STEPS = 1e2

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
        return [x, f(x)] as const
    })
}
