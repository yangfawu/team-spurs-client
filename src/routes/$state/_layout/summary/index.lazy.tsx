import Navbar from "@/components/navbar"
import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode"
import { MapRefProvider } from "@/contexts/map-ref"
import { createLazyFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import App from "./-components/app"
import Loader from "./-components/loader"

function Page() {
    return (
        <CurrentModeProvider value={Mode.SUMMARY}>
            <Navbar />
            <Suspense fallback={<Loader />}>
                <MapRefProvider>
                    <App />
                </MapRefProvider>
            </Suspense>
        </CurrentModeProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/summary/")({
    component: Page,
})
