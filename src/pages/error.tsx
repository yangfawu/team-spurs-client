import { useEffect } from "react"
import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError() as Error | undefined

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <h1>Error</h1>
            <p>{error?.message}</p>
        </div>
    )
}
