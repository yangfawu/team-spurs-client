import useSelectedState from "@/hooks/use-selected-state"
import { Link } from "react-router-dom"

export default function Page() {
    const [, state_name] = useSelectedState()

    return (
        <div>
            <h3>
                You have selected <code>{JSON.stringify(state_name)}</code>
            </h3>
            <p>Please select a mode to further explore this state.</p>
            <ol className="list-decimal list-inside">
                <li>
                    <Link to="district-plan">
                        See the currently enacted district plan of {state_name}
                    </Link>
                </li>
                <li>
                    <Link to="minority-distribution">
                        Visualize the minority distribution of different groups
                        in {state_name}
                    </Link>
                </li>
                <li>
                    <Link to="overview">
                        Get a breakdown of population distribution, voter
                        behavior, and other analysis in {state_name}
                    </Link>
                </li>
                <li>
                    <Link to="compare">
                        Compare the currently enacted district plan in{" "}
                        {state_name} with a randomly generated plan.
                    </Link>
                </li>
            </ol>
        </div>
    )
}
