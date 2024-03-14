import NamedLogo from "@/components/attribution/named-logo"
import StateSelection from "@/components/control/state-selection"
import useSelectedState from "@/hooks/use-selected-state"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"

export default function Page() {
    const [state_code, state_name] = useSelectedState()

    return (
        <div className="h-full flex flex-col divide-black divide-y-2">
            <div className="flex divide-black divide-x-2">
                <NamedLogo />
                <StateSelection value={state_code} getPath={v => `/${v}`} />
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="space-y-8">
                    <div className="text-3xl text-center">
                        <h3>
                            You have selected{" "}
                            <code>{JSON.stringify(state_name)}</code>
                        </h3>
                        <p>
                            Please select a mode to further explore this state.
                        </p>
                    </div>
                    <ol className="flex gap-8 flex-wrap">
                        <li>
                            <Option to="district-plan">
                                See the currently enacted district plan of{" "}
                                {state_name}
                            </Option>
                        </li>
                        <li>
                            <Option to="minority-distribution">
                                Visualize the minority distribution of different
                                groups in {state_name}
                            </Option>
                        </li>
                        <li>
                            <Option to="overview">
                                Get a breakdown of population distribution,
                                voter behavior, and other analysis in{" "}
                                {state_name}
                            </Option>
                        </li>
                        <li>
                            <Option to="compare">
                                Compare the currently enacted district plan in{" "}
                                {state_name} with a randomly generated plan.
                            </Option>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

const Option = tw(Link)`
    block w-56 h-56
    transition
    border-2 border-gray-900 rounded-md
    shadow-lg hover:shadow-none
    flex items-center justify-center
    text-lg text-center
    hover:bg-gray-200 active:bg-gray-500
    p-2 box-border
`
