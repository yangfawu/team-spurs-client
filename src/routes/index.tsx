import Logo from "@/components/logo"
import { createFileRoute } from "@tanstack/react-router"
import App from "./-components/app"

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

export const Route = createFileRoute("/")({
    component: Page,
})
