import Group, { GROUP_TO_ABBREV, GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import { useFilterContext } from "../context"
import Dropdown from "./dropdown"

export default function GroupFilter() {
    const { groupFilter, setGroupFilter } = useFilterContext()

    return (
        <Dropdown
            tag="Groups"
            value={groupFilter}
            setValue={setGroupFilter}
            format={format}
            formatShort={formatShort}
            options={SUPPORTED_GROUPS}
        />
    )
}

const format = (value: Group) => GROUP_TO_NAME[value]
const formatShort = (value: Group) => GROUP_TO_ABBREV[value]
