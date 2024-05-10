import Mode from "@/constants/mode"
import { useSafeCurrentState } from "@/contexts/current-state"
import { Navigate, createLazyFileRoute } from "@tanstack/react-router"

function Page() {
    const state = useSafeCurrentState()

    return <Navigate to={`/$state/${Mode.SUMMARY}`} params={{ state }} />
}

export const Route = createLazyFileRoute("/$state/_layout/")({
    component: Page,
})
