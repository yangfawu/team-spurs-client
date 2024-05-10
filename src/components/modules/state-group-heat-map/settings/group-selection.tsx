import Group, { GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import { useHeatSettings } from "@/contexts/heat-settings"
import Dropdown from "./dropdown"

export default function GroupSelection() {
    const { group, setGroup } = useHeatSettings()

    return <Dropdown value={group} setValue={setGroup} options={SUPPORTED_GROUPS} tag="Group" format={format} />
}

const format = (group: Group) => GROUP_TO_NAME[group]
