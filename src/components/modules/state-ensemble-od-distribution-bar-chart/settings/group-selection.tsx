import Group, { GROUP_TO_NAME } from "@/constants/group"
import { useSettingsContext } from "../context"
import Dropdown from "./dropdown"

export default function GroupSelection() {
    const { group, setGroup } = useSettingsContext()

    return (
        <Dropdown
            value={group}
            setValue={setGroup}
            options={SUPPORTED_GROUPS}
            tag="Group"
            format={formatGroup}
        />
    )
}

const formatGroup = (group: Group) => GROUP_TO_NAME[group]

const SUPPORTED_GROUPS: Group[] = [Group.BLACK, Group.HISPANIC_LATINO, Group.ASIAN]
