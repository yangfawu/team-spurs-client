import tw from "tailwind-styled-components"
import ClearFiltersAction from "./clear-filters-action"
import GroupFilter from "./group-filter"
import PartyFilter from "./party-filter"
import UnselectDistrictAction from "./unselect-district-action"

interface Props {
    size: number
}
export default function Control({ size }: Props) {
    return (
        <Container>
            <p>
                Rows: <em>{size}</em>
            </p>
            <ClearFiltersAction />
            <UnselectDistrictAction />
            <div className="flex-1" />
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
