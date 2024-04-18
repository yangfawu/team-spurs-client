import BigSpinner from "@/components/big-spinner"
import MyTanStackRouterDevtools from "@/components/my-tan-stack-router-devtools"
import { store } from "@/redux/store"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import { Provider } from "react-redux"

function RootLayout() {
    return (
        <>
            <Provider store={store}>
                <div className="h-full flex flex-col divide-black divide-y-2">
                    <Outlet />
                </div>
            </Provider>
            <Suspense>
                <MyTanStackRouterDevtools position="bottom-right" />
            </Suspense>
        </>
    )
}

export const Route = createRootRoute({
    component: RootLayout,
    pendingComponent: BigSpinner,
    notFoundComponent: () => <div>Not found!!!!</div>,
})
