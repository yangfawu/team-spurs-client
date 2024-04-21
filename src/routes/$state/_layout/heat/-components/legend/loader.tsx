import tw from "tailwind-styled-components"

export default function Loader() {
    return (
        <Container>
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
        </Container>
    )
}

const Container = tw.div`
    flex flex-wrap gap-2
    h-9
`

const Panel = tw.div`
    bg-gray-300
    rounded
    flex-1
`
