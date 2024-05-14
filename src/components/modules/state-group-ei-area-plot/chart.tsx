import ApexCharts from "react-apexcharts"

interface Props {
    id: string
    title: string
    categories: number[]
    series: ApexCharts["props"]["series"]
}
export default function Chart({ id, categories, series, title }: Props) {
    return (
        <div className="flex-1" id={id}>
            <ApexCharts
                height="100%"
                type="area"
                options={{
                    title: {
                        text: title,
                        align: "center",
                        offsetY: 20,
                    },
                    chart: {
                        id,
                        type: "area",
                        group: "ei",
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
                        min: 0,
                        max: 1,
                        tickAmount: 5,
                    },
                    yaxis: {
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
                        // floating: true,
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
