import tw from "tailwind-styled-components"

export default function Loader() {
    return (
        <Container>
            <Content className="h-4 max-w-32" />
            <Content className="h-32" />
        </Container>
    )
}

const Container = tw.div`
    h-full
    animate-pulse 
    bg-gray-300 
    rounded 
    p-2
    space-y-2
`

const Content = tw.div`
    bg-gray-400
    rounded
`
