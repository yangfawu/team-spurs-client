import { Suspense } from "react"
import Table from "./table"

export default function Representatives() {
    return (
        <div className="h-full overflow-auto scroll-pt-7">
            <h3 className="p-2 text-lg font-bold">Representatives</h3>
            <Suspense fallback="Loading...">
                <Table />
            </Suspense>
        </div>
    )
}
