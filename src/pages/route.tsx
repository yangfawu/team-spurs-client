import { Route } from "react-router-dom"
import STATE_ROUTER from "./[state]/route"
import Error from "./error"
import Layout from "./layout"
import NotFound from "./not-found"
import Page from "./page"

const ROOT_ROUTER = (
    <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Page />} />
        {STATE_ROUTER}
        <Route path="*" element={<NotFound />} />
    </Route>
)

export default ROOT_ROUTER
