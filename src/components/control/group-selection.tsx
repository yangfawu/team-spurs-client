import { GROUP_TO_NAME, SUPPORTED_GROUPS } from "@/constants/group"
import { useCurrentGroup } from "@/contexts/current-group.context"
import { Menu } from "@headlessui/react"
import { Link } from "@tanstack/react-router"
import { Fragment } from "react"
import Dropdown from "./dropdown"

export default function GroupSelection() {
    const group = useCurrentGroup()

    if (!group) return null

    return (
        <Dropdown current={GROUP_TO_NAME[group]}>
            {SUPPORTED_GROUPS.map($g => (
                <Menu.Item key={$g} as={Fragment}>
                    <Link className="block" params={prev => ({ ...prev, group: $g })}>
                        <Dropdown.Option>{GROUP_TO_NAME[$g]}</Dropdown.Option>
                    </Link>
                </Menu.Item>
            ))}
        </Dropdown>
    )
}
