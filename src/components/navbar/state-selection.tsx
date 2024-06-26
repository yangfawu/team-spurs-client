import { STATE_TO_NAME, SUPPORTED_STATES } from "@/constants/state"
import { useSafeCurrentMode } from "@/contexts/current-mode"
import { useCurrentState } from "@/contexts/current-state"
import { Menu } from "@headlessui/react"
import { Link } from "@tanstack/react-router"
import { Fragment } from "react"
import Dropdown from "./dropdown"

export default function StateSelection() {
    const state = useCurrentState()
    const mode = useSafeCurrentMode()

    if (!state) return null

    return (
        <Dropdown current={STATE_TO_NAME[state]}>
            {SUPPORTED_STATES.map($s => (
                <Menu.Item key={$s} as={Fragment}>
                    <Link className="block" to={`/$state/${mode}`} params={{ state: $s }}>
                        <Dropdown.Option>{STATE_TO_NAME[$s]}</Dropdown.Option>
                    </Link>
                </Menu.Item>
            ))}
        </Dropdown>
    )
}
