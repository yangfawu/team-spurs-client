import useSelectedState from "@/hooks/use-selected-state"
import { Link } from "react-router-dom"

export default function Page() {
    const [, state_name] = useSelectedState()

    return (
        <div>
            <h3>
                You have selected to <b>compare</b> the currently enacted
                district plan in <b>{state_name}</b> with a randomly generated
                plan.
            </h3>
            <p>
                <Link to="/">Reset</Link>
            </p>
        </div>
    )
}
