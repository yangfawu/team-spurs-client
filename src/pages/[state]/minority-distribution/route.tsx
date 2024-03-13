import { lazy } from "react"
import { Route } from "react-router-dom"

const Layout = lazy(() => import("./layout"))
const Page = lazy(() => import("./page"))

const MINORITY_DISTRIBUTION_ROUTER = (
    <Route path="minority-distribution" Component={Layout}>
        <Route index Component={Page} />
    </Route>
)

export default MINORITY_DISTRIBUTION_ROUTER
