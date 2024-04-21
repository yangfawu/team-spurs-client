import tw from "tailwind-styled-components"

export default function Legend() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Legend</h3>
        </Container>
    )
}

const Container = tw.div`
    flex-1
    p-2
    flex flex-col items-stretch gap-2
`
