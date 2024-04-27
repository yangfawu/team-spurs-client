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
import { useMemo } from "react"
import { Scatter } from "react-chartjs-2"

ChartJS.register(annotationPlugin)
export default function Chart() {
    const state = useSafeCurrentState()
    const group = useAppSelector(selectGroup)
    const { data } = useSuspenseQuery(fetchPrecinctAnalysis(state, group))

    const democratPrecinctPoints = useMemo(() => {
        return data.rows.map(({ percent_group, percent_democrat }) => [percent_group, percent_democrat] as const)
    }, [data])

    const republicanPrecinctPoints = useMemo(() => {
        return data.rows.map(({ percent_group, percent_republican }) => [percent_group, percent_republican] as const)
    }, [data])

    const REGRESSION_LINE_STEPS = useMemo(() => {
        return Math.ceil(Math.max(...data.rows.map(({ percent_group }) => percent_group)) / 1e-2)
    }, [data])

    const democratRegressionPoints = useMemo(() => {
        const config = data.lines.find(({ party }) => party === Party.DEMOCRAT)
        if (!config) return []

        const [a, b, c] = config.coefficients
        const f = (x: number) => a * Math.exp(-b * x) + c
        return Array.from({ length: REGRESSION_LINE_STEPS }, (_, i) => {
            const x = 1e-2 * i
            return [x, f(x)] as const
        })
    }, [data, REGRESSION_LINE_STEPS])

    const republicanRegressionPoints = useMemo(() => {
        const config = data.lines.find(({ party }) => party === Party.REPUBLICAN)
        if (!config) return []

        const [a, b, c] = config.coefficients
        const f = (x: number) => a * Math.exp(-b * x) + c
        return Array.from({ length: REGRESSION_LINE_STEPS }, (_, i) => {
            const x = 1e-2 * i
            return [x, f(x)] as const
        })
    }, [data, REGRESSION_LINE_STEPS])

    const composedData = {
        datasets: [
            {
                label: "Democrat Vote Share",
                data: democratPrecinctPoints,
                backgroundColor: "#00f5",
            },
            {
                label: "Republican Vote Share",
                data: republicanPrecinctPoints,
                backgroundColor: "#f005",
            },
            {
                label: "Democrat Line",
                data: democratRegressionPoints,
                type: "line",
                borderColor: "#00f",
                borderWidth: 4,
                fill: false,
                showLine: true,
                pointRadius: 0,
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

    const xAxisLabel = `% ${GROUP_TO_NAME[group]}`
    const yAxisLabel = "Vote Share"
    const options = {
        responsive: true,
        scales: {
            x: {
                type: "linear",
                position: "bottom",
                title: {
                    display: true,
                    text: xAxisLabel,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    min: 0,
                    max: 1,
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
        },
        maintainAspectRatio: false
    }

    return (
        <div className="flex-1 overflow-hidden">
            {/* @ts-ignore */}
            <Scatter data={composedData} options={options} width="100%" />
        </div>
    )
}
