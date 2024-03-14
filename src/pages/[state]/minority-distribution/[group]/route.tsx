import { lazy } from "react"
import { Route } from "react-router-dom"

const Layout = lazy(() => import("./layout"))
const Page = lazy(() => import("./page"))

const GROUP_ROUTER = (
    <Route path=":group" Component={Layout}>
        <Route index Component={Page} />
    </Route>
)

export default GROUP_ROUTER
