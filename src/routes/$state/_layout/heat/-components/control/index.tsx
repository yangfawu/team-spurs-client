import tw from "tailwind-styled-components"
import GroupSelection from "./group-selection"
import LevelSelection from "./level-selection"

export default function Control() {
    return (
        <Container>
            <h3 className="text-lg font-bold">Control</h3>
            <div className="relative z-[1000] flex flex-wrap gap-2 items-center">
                <GroupSelection />
                <LevelSelection />
            </div>
        </Container>
    )
}

const Container = tw.div`
    p-2
    flex flex-col items-stretch gap-2
`
