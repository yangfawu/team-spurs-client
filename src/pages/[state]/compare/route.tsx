import { lazy } from "react"
import { Route } from "react-router-dom"

const Layout = lazy(() => import("./layout"))
const Page = lazy(() => import("./page"))

const COMPARE_ROUTER = (
    <Route path="compare" Component={Layout}>
        <Route index Component={Page} />
    </Route>
)

export default COMPARE_ROUTER
