import tw from "tailwind-styled-components"

export default function ScatterPlot() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Scatter Plot View</h3>
        </Container>
    )
}

const Container = tw.div`
    h-full
    p-2
    flex flex-col items-stretch gap-2
`
