import Footer from "@/components/footer"
import Header from "@/components/header"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Loading from "./loading"

export default function Layout() {
    return (
        <>
            <Header />
            <main className="flex-1">
                <span className="sr-only">root layout</span>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </>
    )
}
