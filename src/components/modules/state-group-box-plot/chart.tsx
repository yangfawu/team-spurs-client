import { fetchBoxAndWhiskerAnalysis } from "@/api/racial"
import Group, { GROUP_TO_NAME } from "@/constants/group"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import ApexCharts from "react-apexcharts"

interface Props {
    state: State
    group: Group
}
export default function Chart({ state, group }: Props) {
    const { data } = useSuspenseQuery(fetchBoxAndWhiskerAnalysis(state, group))

    const categories = useMemo(() => {
        const N = Math.max(data.boxes.length, data.enacted.length)
        return Array.from({ length: N }, (_, i) => `${i + 1}`)
    }, [data])

    const boxPlotData = useMemo(() => {
        const { boxes } = data
        const out = boxes.slice()
        out.sort((a, b) => a.min - b.min)
        return out.map(({ min, q1, med, q3, max }, i) => ({
            x: `${i + 1}`,
            y: [min, q1, med, q3, max] as const,
        }))
    }, [data])

    const enactedScatterData = useMemo(() => {
        const { enacted } = data
        const out = enacted.slice()
        out.sort()
        return out.map((y, i) => ({
            x: `${i + 1}`,
            y,
        }))
    }, [data])

    return (
        <div className="flex-1">
            <ApexCharts
                height="100%"
                type="boxPlot"
                options={{
                    chart: {
                        type: "boxPlot",
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
                    plotOptions: {
                        boxPlot: {
                            colors: {
                                upper: "#e9ecef",
                                lower: "#f8f9fa",
                            },
                        },
                    },
                    xaxis: {
                        title: {
                            text: "Indexed Districts",
                        },
                        categories,
                        type: "category",
                        tickAmount: 20,
                    },
                    yaxis: {
                        title: {
                            text: `% ${GROUP_TO_NAME[group]}`,
                        },
                        labels: {
                            formatter: (value: number) => `${+(value * 100).toFixed(2)}%`,
                        },
                    },
                    legend: {
                        position: "top",
                        horizontalAlign: "right",
                        labels: {
                            useSeriesColors: false,
                        },
                    },
                    tooltip: {
                        custom: ({ seriesIndex, dataPointIndex, w }) => {
                            if (seriesIndex === 0) {
                                const min = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
                                const q1 = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
                                const med = w.globals.seriesCandleM[seriesIndex][dataPointIndex]
                                const q3 = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
                                const max = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
                                return `
                                <div class="apexcharts-tooltip-box apexcharts-tooltip-boxPlot">
                                    <div>Minimum: <span class="value">${format(min)}</span></div>
                                    <div>Q1: <span class="value">${format(q1)}</span></div>
                                    <div>Median: <span class="value">${format(med)}</span></div>
                                    <div>Q3: <span class="value">${format(q3)}</span></div>
                                    <div>Maximum: <span class="value">${format(max)}</span></div>
                                    <div><span class="value">ENSEMBLE</span></div>
                                </div>
                                `
                            }

                            const value = w.globals.series[seriesIndex][dataPointIndex]
                            return `
                            <div class="apexcharts-tooltip-box apexcharts-tooltip-boxScatter">
                                <div><span class="value">ENACTED</span></div>
                                <div>% ${GROUP_TO_NAME[group]}: <span class="value">${format(value)}</span></div>
                            </div> 
                            `
                        },
                    },
                }}
                series={[
                    {
                        type: "boxPlot",
                        name: "Ensemble",
                        data: boxPlotData,
                        color: "#000",
                    },
                    {
                        type: "scatter",
                        name: "Enacted",
                        data: enactedScatterData,
                    },
                ]}
            />
        </div>
    )
}

const format = (value: any) => `${+(Number(value) * 100).toFixed(2)}%`
