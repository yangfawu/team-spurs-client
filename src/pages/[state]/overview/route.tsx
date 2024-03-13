import { lazy } from "react"
import { Route } from "react-router-dom"

const Layout = lazy(() => import("./layout"))
const Page = lazy(() => import("./page"))

const OVERVIEW_ROUTER = (
    <Route path="overview" Component={Layout}>
        <Route index Component={Page} />
    </Route>
)

export default OVERVIEW_ROUTER
