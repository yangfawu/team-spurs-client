import { SUPPORTED_STATE_ENTRIES } from "@/constants/states"
import { Link } from "react-router-dom"

export default function Page() {
    return (
        <div>
            <h3>Select a State</h3>
            <ol className="list-decimal list-inside">
                {SUPPORTED_STATE_ENTRIES.map(([key, name]) => (
                    <li key={key}>
                        <Link to={key}>{name}</Link>
                    </li>
                ))}
            </ol>
        </div>
    )
}
