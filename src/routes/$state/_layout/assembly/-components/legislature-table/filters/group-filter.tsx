import Group, { GROUP_TO_ABBREV, GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import { selectLegislature, setGroupFilter } from "@/redux/assembly"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useMemo } from "react"
import Dropdown from "./dropdown"

const format = (value: Group) => GROUP_TO_NAME[value]
const formatShort = (value: Group) => GROUP_TO_ABBREV[value]

export default function GroupFilter() {
    const { groups } = useAppSelector(selectLegislature)

    const dispatch = useAppDispatch()
    const setGroups = useMemo(() => {
        return (value: Group[]) => {
            dispatch(setGroupFilter(value))
        }
    }, [])

    return (
        <Dropdown
            tag="Groups"
            value={groups}
            setValue={setGroups}
            format={format}
            formatShort={formatShort}
            options={SUPPORTED_GROUPS}
        />
    )
}
