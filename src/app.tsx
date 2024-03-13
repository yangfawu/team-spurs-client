import BigSpinner from "@/components/big-spinner"
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom"
import ROOT_ROUTER from "./pages/route"

const router = createBrowserRouter(createRoutesFromElements(ROOT_ROUTER))

export default function App() {
    return <RouterProvider router={router} fallbackElement={<BigSpinner />} />
}
