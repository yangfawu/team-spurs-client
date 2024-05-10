import tw from "tailwind-styled-components"
import ClearPrecinctAction from "./clear-precinct-action"
import GroupSelection from "./group-selection"
import LevelSelection from "./level-selection"

export default function Control() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Control</h3>
            <ActionBox>
                <GroupSelection />
                <LevelSelection />
                <ClearPrecinctAction />
            </ActionBox>
        </Container>
    )
}

const Container = tw.div`
    relative
    h-full
    p-2
    overflow-auto
    flex flex-col items-stretch gap-2
`

const ActionBox = tw.div`
    flex items-center gap-2 flex-wrap
`
