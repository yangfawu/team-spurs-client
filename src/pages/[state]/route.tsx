import { lazy } from "react"
import { Route } from "react-router-dom"
import COMPARE_ROUTER from "./compare/route"
import DISTRICT_PLAN_ROUTER from "./district-plan/route"
import MINORITY_DISTRIBUTION_ROUTER from "./minority-distribution/route"
import OVERVIEW_ROUTER from "./overview/route"

const Page = lazy(() => import("./page"))
const Layout = lazy(() => import("./layout"))

const STATE_ROUTER = (
    <Route path=":state" element={<Layout />}>
        <Route index element={<Page />} />
        {COMPARE_ROUTER}
        {DISTRICT_PLAN_ROUTER}
        {MINORITY_DISTRIBUTION_ROUTER}
        {OVERVIEW_ROUTER}
    </Route>
)

export default STATE_ROUTER
