import { Route } from "react-router-dom"
import ABOUT_ROUTER from "./about/route"
import Error from "./error"
import Layout from "./layout"
import NotFound from "./not-found"
import Page from "./page"
import PRODUCT_ROUTER from "./product/route"

const ROOT_ROUTER = (
    <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Page />} />
        {PRODUCT_ROUTER}
        {ABOUT_ROUTER}
        <Route path="*" element={<NotFound />} />
    </Route>
)

export default ROOT_ROUTER
