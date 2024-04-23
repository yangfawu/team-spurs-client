import { Link } from "@tanstack/react-router"
import Logo from "../logo"
import ModeSelection from "./mode-selection"
import StateSelection from "./state-selection"

export default function Navbar() {
    return (
        <div className="flex divide-black divide-x-2">
            <Logo />
            <StateSelection />
            <ModeSelection />
            <div className="flex-1 flex items-center justify-end p-2">
                <Link className="px-2 py-1 bg-gray-200 hover:bg-gray-400 rounded-full text-sm" to="/">
                    reset
                </Link>
            </div>
        </div>
    )
}
