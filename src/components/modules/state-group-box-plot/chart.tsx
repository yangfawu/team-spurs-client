import { BOX_PLOT_ANALYSIS_DATA } from "@/constants/fake-box-plot-data"
import Group, { GROUP_TO_NAME } from "@/constants/group"
import State from "@/constants/state"
import { useMemo } from "react"
import ApexCharts from "react-apexcharts"

interface Props {
    state: State
    group: Group
}
export default function BoxPlotAnalysis({ state, group }: Props) {
    const source = useMemo(() => {
        const copy = BOX_PLOT_ANALYSIS_DATA.slice()
        copy.sort((a, b) => a.simulation[2] - b.simulation[2])
        return copy.map(({ simulation, actual }, id) => ({
            id: `${id + 1}`,
            simulation,
            actual,
        }))
    }, [BOX_PLOT_ANALYSIS_DATA])

    const categories = useMemo(() => {
        return source.map(({ id }) => id)
    }, [source])

    const boxPlotData = useMemo(() => {
        return source.map(({ id, simulation }) => ({
            x: id,
            y: simulation,
        }))
    }, [source])

    const enactedScatterData = useMemo(() => {
        return source.map(({ id, actual: { enacted } }) => ({
            x: id,
            y: enacted,
        }))
    }, [source])

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
                    },
                    yaxis: {
                        title: {
                            text: `% ${GROUP_TO_NAME[group]}`,
                        },
                        labels: {
                            formatter: (value: number) => `${value * 100}%`,
                        },
                    },
                    legend: {
                        position: "top",
                        horizontalAlign: "right",
                        labels: {
                            useSeriesColors: false,
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
