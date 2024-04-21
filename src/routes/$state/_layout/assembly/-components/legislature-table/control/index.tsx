import { clearDistrict, selectDistrict } from "@/redux/assembly"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useCallback } from "react"
import tw from "tailwind-styled-components"
import GroupFilter from "./group-filter"
import PartyFilter from "./party-filter"

interface Props {
    size: number
}
export default function Control({ size }: Props) {
    const dispatch = useAppDispatch()
    const district = useAppSelector(selectDistrict)

    const deselect = useCallback(() => {
        dispatch(clearDistrict())
    }, [])

    return (
        <Container>
            <p>
                Rows: <em>{size}</em>
            </p>
            {district && (
                <div>
                    <Action onClick={deselect}>unselect district {district.id}</Action>
                </div>
            )}
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

const Action = tw.button`
    px-2 py-1
    rounded-full
    text-sm
    bg-gray-100
    hover:bg-gray-200
`
