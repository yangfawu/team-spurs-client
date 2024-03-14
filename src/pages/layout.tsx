import { store } from "@/redux/store"
import { Suspense } from "react"
import { Provider } from "react-redux"
import { Outlet } from "react-router-dom"
import Loading from "./loading"

export default function Layout() {
    return (
        <Provider store={store}>
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </Provider>
    )
}
