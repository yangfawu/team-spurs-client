import RouterLoader from "@/components/loader/router-loader"
import QueryDevtools from "@/components/tanstack/query-devtools"
import RouterDevtools from "@/components/tanstack/router-devtools"
import { store } from "@/redux/store"
import { QueryClient } from "@tanstack/react-query"
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"
import { Suspense } from "react"
import { Provider } from "react-redux"

function RootLayout() {
    return (
        <>
            <Provider store={store}>
                <div className="h-full flex flex-col divide-black divide-y-2">
                    <RouterLoader />
                    <Outlet />
                </div>
            </Provider>
            <Suspense>
                <QueryDevtools buttonPosition="bottom-left" />
                <RouterDevtools position="bottom-right" />
            </Suspense>
        </>
    )
}

const createRootRoute = createRootRouteWithContext<{
    queryClient: QueryClient
}>()
export const Route = createRootRoute({
    component: RootLayout,
})
