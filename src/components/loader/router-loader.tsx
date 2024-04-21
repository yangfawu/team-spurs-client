import { useRouterState } from "@tanstack/react-router"

export default function RouterLoader() {
    const isLoading = useRouterState({ select: s => s.status === "pending" })

    if (!isLoading) return null

    return (
        <div className="h-1 bg-gray-300">
            <div className="animate-pulse bg-blue-500 h-full" />
        </div>
    )
}
