import tw from "tailwind-styled-components"

export default function BarChartLoader() {
    return (
        <Table>
            <Bar className="row-span-5" />
            <Bar className="row-span-3" />
            <Bar className="row-span-2" />
            <Bar className="row-span-1" />
            <Bar className="row-span-4" />
            <Bar className="row-span-1" />
        </Table>
    )
}

const Table = tw.div`
    flex-1
    rounded bg-gray-300
    animate-pulse
    grid grid-cols-6 grid-rows-5 gap-2
    p-2
`

const Bar = tw.div`
    rounded 
    bg-gray-400
    col-span-1
    row-end-6
`
