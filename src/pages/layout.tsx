import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Loading from "./loading"

export default function Layout() {
    return (
        <Suspense fallback={<Loading />}>
            <Outlet />
        </Suspense>
    )
}
