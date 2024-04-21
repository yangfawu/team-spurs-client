import tw from "tailwind-styled-components"
import GroupFilter from "./group-filter"
import PartyFilter from "./party-filter"

export default function Filters() {
    return (
        <Container>
            <h3 className="flex-1 text-lg font-semibold">Filters</h3>
            <GroupFilter />
            <PartyFilter />
        </Container>
    )
}

const Container = tw.div`
    sticky bottom-0 left-0 right-0
    flex items-center justify-end gap-2
    bg-white
    p-2
    border-t-2
`
