import tw from "tailwind-styled-components"

export default function Loader() {
    return (
        <Container>
            {Array(20).fill(null).map((_, i) => (
                <Panel key={i} />
            ))}
        </Container>
    )
}

const Container = tw.div`
    flex-1
    p-2
    rounded
    bg-gray-300
    animate-pulse
    grid grid-cols-5 gap-2
`

const Panel = tw.div`
    rounded
    bg-gray-400
    row-span-1
    col-span-1
`
