import { useParams } from "react-router-dom"

export default function Page() {
    const { pid } = useParams()

    return (
        <div>
            <h1>Product #{pid}</h1>
        </div>
    )
}
