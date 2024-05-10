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

    const boxData = useMemo(() => {
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
        <ApexCharts
            // height={350}
            height="90%"
            type="boxPlot"
            options={{
                chart: {
                    type: "boxPlot",
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
                        // colors: {
                        //     upper: "#8884d8",
                        //     lower: "#82ca9d",
                        // },
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
                },
            }}
            series={[
                {
                    type: "boxPlot",
                    name: "ReCom Ensemble",
                    data: boxData,
                },
                {
                    type: "scatter",
                    name: "Enacted",
                    data: enactedScatterData,
                },
            ]}
        />
    )
}
