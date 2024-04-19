import Logo from "@/components/logo"
import { STATE_TO_NAME, SUPPORTED_STATES } from "@/constants/state"
import { Link, createFileRoute } from "@tanstack/react-router"
import tw from "tailwind-styled-components"
import App from "./-app"

function Page() {
    return (
        <div className="h-full flex flex-col divide-black divide-y-2">
            <div>
                <Logo />
            </div>
            <App />
            
        </div>
    )
}

const Option = tw(Link)`
    block w-56 h-56
    transition
    border-2 border-gray-900 rounded-md
    shadow-lg hover:shadow-none
    flex items-center justify-center
    text-xl
    font-semibold
    hover:bg-gray-200 active:bg-gray-500
`

export const Route = createFileRoute("/")({
    component: Page,
})
