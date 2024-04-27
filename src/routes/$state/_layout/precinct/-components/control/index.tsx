import tw from "tailwind-styled-components"
import ElectionSelection from "./election-selection"
import GroupSelection from "./group-selection"
import ViewSelection from "./view-selection"

export default function Control() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Control</h3>
            <ActionBox>
                <ElectionSelection />
                <GroupSelection />
                <ViewSelection />
            </ActionBox>
        </Container>
    )
}

const Container = tw.div`
    relative
    p-2
    space-y-2
`

const ActionBox = tw.div`
    flex flex-wrap
    items-start
    gap-2
`
