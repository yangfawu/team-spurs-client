import { useAppSelector } from "@/redux/hooks"
import { selectView } from "@/redux/precinct"
import { Suspense, useMemo } from "react"
import Control from "./control"
import VIEWS from "./data"

export default function App() {
    const view = useAppSelector(selectView)

    const Component = useMemo(() => {
        return VIEWS[view]
    }, [view, VIEWS])

    return (
        <>
            <Control />
            <div className="flex-1 overflow-hidden">
                <Suspense fallback={null}>
                    <Component />
                </Suspense>
            </div>
        </>
    )
}
