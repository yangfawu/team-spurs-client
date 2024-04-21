import Control from "@/components/control"
import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode"
import { createLazyFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import App from "./-components/app"
import Loader from "./-components/loader"

function Layout() {
    return (
        <CurrentModeProvider value={Mode.HEAT}>
            <Control />
            <Suspense fallback={<Loader />}>
                <App />
            </Suspense>
        </CurrentModeProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/heat/")({
    component: Layout,
})
