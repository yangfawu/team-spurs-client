import tw from "tailwind-styled-components"

export default function Control() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Control</h3>
        </Container>
    )
}

const Container = tw.div`
    p-2
    flex flex-col items-stretch gap-2
`
