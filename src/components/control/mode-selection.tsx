import { MODE_TO_NAME, SUPPORTED_MODES } from "@/constants/mode"
import { useCurrentMode } from "@/contexts/current-mode.context"
import { Menu } from "@headlessui/react"
import { Link } from "@tanstack/react-router"
import { Fragment } from "react"
import Dropdown from "./dropdown"

export default function ModeSelection() {
    const mode = useCurrentMode()

    if (!mode) return null

    return (
        <Dropdown current={MODE_TO_NAME[mode]}>
            {SUPPORTED_MODES.map($m => (
                <Menu.Item key={$m} as={Fragment}>
                    <Link to={`/$state/${$m}`} className="block">
                        <Dropdown.Option>{MODE_TO_NAME[$m]}</Dropdown.Option>
                    </Link>
                </Menu.Item>
            ))}
        </Dropdown>
    )
}
