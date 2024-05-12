import Group, { GROUP_TO_NAME } from "@/constants/group"
import { useHeatSettings } from "@/contexts/heat-settings"
import Dropdown from "./dropdown"

export default function GroupSelection() {
    const { group, setGroup } = useHeatSettings()

    return <Dropdown value={group} setValue={setGroup} options={CURATED_GROUPS} tag="Group" format={format} />
}

const format = (group: Group) => GROUP_TO_NAME[group]

const CURATED_GROUPS: Group[] = [Group.WHITE, Group.BLACK, Group.HISPANIC_LATINO, Group.ASIAN]
