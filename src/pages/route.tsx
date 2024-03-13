import { Route } from "react-router-dom"
import Error from "./error"
import Layout from "./layout"
import NotFound from "./not-found"
import Page from "./page"

const ROOT_ROUTER = (
    <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<Page />} />
        <Route path="*" element={<NotFound />} />
    </Route>
)

export default ROOT_ROUTER
