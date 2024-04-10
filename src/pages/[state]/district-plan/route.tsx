import Mode from "@/constants/mode"
import { lazy } from "react"
import { Route } from "react-router-dom"

const Layout = lazy(() => import("./layout"))
const Page = lazy(() => import("./page"))

const DISTRICT_PLAN_ROUTER = (
    <Route path={Mode.DISTRICT_PLAN} Component={Layout}>
        <Route index Component={Page} />
    </Route>
)

export default DISTRICT_PLAN_ROUTER
