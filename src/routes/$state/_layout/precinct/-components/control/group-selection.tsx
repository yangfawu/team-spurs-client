import Group, { GROUP_TO_NAME, OPPORTUNITY_GROUPS } from "@/constants/group"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectGroup, setGroup } from "@/redux/precinct"
import { useMemo } from "react"
import Dropdown from "./dropdown"

export default function GroupSelection() {
    const group = useAppSelector(selectGroup)

    const dispatch = useAppDispatch()
    const updateGroup = useMemo(() => {
        return (newGroup: Group) => {
            dispatch(setGroup(newGroup))
        }
    }, [])

    return <Dropdown value={group} setValue={updateGroup} options={OPPORTUNITY_GROUPS} tag="Group" format={formatter} />
}

const formatter = (group: Group) => GROUP_TO_NAME[group]
