import { lazy } from "react"
import { Route } from "react-router-dom"
import SLUG_ROUTER from "./[pid]/route"

// all non-critical pages should be lazy loaded
const Page = lazy(() => import("./page"))

const PRODUCT_ROUTER = (
    // no Layout, so outermost route has no element
    <Route path="product">
        <Route index element={<Page />} />
        {SLUG_ROUTER}
    </Route>
)

export default PRODUCT_ROUTER
