import tw from "tailwind-styled-components"
import GroupSelection from "./group-selection"
import LevelSelection from "./level-selection"

export default function Control() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Control</h3>
            <ActionBox>
                <GroupSelection />
                <LevelSelection />
            </ActionBox>
        </Container>
    )
}

const Container = tw.div`
    relative z-[9000]
    h-full
    p-2
    overflow-y-auto
    flex flex-col items-stretch gap-2
`

const ActionBox = tw.div`
    relative z-[2000]
    flex items-center gap-2 flex-wrap
`
