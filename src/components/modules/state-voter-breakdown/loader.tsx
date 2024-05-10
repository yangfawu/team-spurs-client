import tw from "tailwind-styled-components"

export default function Loader() {
    return (
        <Container>
            <Content />
            <Content />
            <Content />
        </Container>
    )
}

const Container = tw.div`
    h-full
    animate-pulse 
    bg-gray-300 
    rounded 
    p-2
    grid grid-cols-3 gap-2
`

const Content = tw.div`
    bg-gray-400
    rounded
`
