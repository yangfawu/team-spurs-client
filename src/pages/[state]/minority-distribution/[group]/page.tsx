import useSelectedState from "@/hooks/use-selected-state"
import { Link } from "react-router-dom"

export default function Page() {
    const [, state_name] = useSelectedState()

    return (
        <div className="flex-1">
            <h3>
                Visualize the <b>minority distribution</b> of different groups
                in <b>{state_name}</b>
            </h3>
            <p>
                <Link to="/">Reset</Link>
            </p>
        </div>
    )
}
