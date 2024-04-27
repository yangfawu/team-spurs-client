import tw from "tailwind-styled-components"
import ElectionSelection from "./election-selection"
import GroupSelection from "./group-selection"

export default function Control() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Control</h3>
            <div className="flex flex-wrap gap-2 items-start">
                <ElectionSelection />
                <GroupSelection />
            </div>
        </Container>
    )
}

const Container = tw.div`
    relative
    p-2
    space-y-2
`

const ActionBox = tw.div`
    flex items-center gap-2 flex-wrap
`
