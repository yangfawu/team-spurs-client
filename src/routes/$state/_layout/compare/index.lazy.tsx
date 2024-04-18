import Control from "@/components/control"
import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode.context"
import { createLazyFileRoute } from "@tanstack/react-router"
import App from "./-app"

function Layout() {
    return (
        <CurrentModeProvider value={Mode.COMPARE}>
            <Control />
            <App />
        </CurrentModeProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/compare/")({
    component: Layout,
})