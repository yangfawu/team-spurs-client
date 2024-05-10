import tw from "tailwind-styled-components"

export default function Loader() {
    return (
        <Container>
            <Panel className="flex-1"/>
            <div className="h-16 flex gap-2">
                <Panel className="w-1/4"/>
                <Panel className="flex-1"/>
            </div>
        </Container>
    )
}

const Container = tw.div`
    flex-1
    animate-pulse
    p-2
    bg-gray-300
    flex flex-col gap-2
`

const Panel = tw.div`
    rounded
    bg-gray-400
`

