import { EI_PLOT_DATA } from "@/constants/fake-ei-plot-data"
import Group from "@/constants/group"
import State from "@/constants/state"
import _ from "lodash"
import { useMemo } from "react"
import ApexCharts from "react-apexcharts"

interface Props {
    state: State
    group: Group
}
export default function Chart({ state, group }: Props) {
    const { candidate, min, max, data } = EI_PLOT_DATA

    const bins = useMemo(() => _.range(min, max + 1), [min, max])

    const categories = useMemo(() => bins.map(v => v / max), [bins])

    const series = useMemo(
        () =>
            data.map(({ key, values }) => ({
                name: key,
                data: bins.map(x => values[x] || 0),
            })),
        [bins, data],
    )

    return (
        <div className="flex-1">
            <ApexCharts
                height="100%"
                type="area"
                options={{
                    title: {
                        text: `Support for ${candidate}`,
                        align: "center",
                    },
                    chart: {
                        type: "area",
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
                    xaxis: {
                        type: "numeric",
                        categories: categories,
                    },
                    yaxis: {
                        labels: {
                            formatter: (value: number) => `${(value * 100).toFixed(0)}`,
                        },
                        axisBorder: {
                            show: true,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "smooth",
                        width: 1,
                    },
                    legend: {
                        position: "top",
                        horizontalAlign: "right",
                        floating: true,
                        labels: {
                            useSeriesColors: false,
                        },
                    },
                    tooltip: {
                        x: {
                            show: false,
                        },
                    },
                }}
                series={series}
            />
        </div>
    )
}
