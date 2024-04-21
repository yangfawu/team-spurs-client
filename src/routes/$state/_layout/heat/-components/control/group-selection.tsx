import Group, { GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group";
import { selectGroup, setGroup } from "@/redux/heat";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMemo } from "react";
import Dropdown from "./dropdown";

export default function GroupSelection() {
    const group = useAppSelector(selectGroup)

    const dispatch = useAppDispatch()
    const updateGroup = useMemo(() => {
        return (newGroup: Group) => {
            dispatch(setGroup(newGroup))
        }
    }, [])

    return <Dropdown value={group} setValue={updateGroup} options={SUPPORTED_GROUPS} tag="Group" format={format} />
}

const format = (group: Group) => GROUP_TO_NAME[group]
