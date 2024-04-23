import Navbar from "@/components/navbar"
import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode"
import { MapRefProvider } from "@/contexts/map-ref"
import { createLazyFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import App from "./-componens/app"
import Loader from "./-componens/loader"

function Layout() {
    return (
        <CurrentModeProvider value={Mode.COMPARE}>
            <Navbar />
            <Suspense fallback={<Loader />}>
                <MapRefProvider>
                    <App />
                </MapRefProvider>
            </Suspense>
        </CurrentModeProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/compare/")({
    component: Layout,
})
