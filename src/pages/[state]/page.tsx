import NamedLogo from "@/components/attribution/named-logo"
import StateSelection from "@/components/control/state-selection"
import Mode from "@/constants/mode"
import { STATE_TO_NAME } from "@/constants/state"
import useSelectedState from "@/hooks/use-selected-state"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"

export default function Page() {
    const state = useSelectedState()

    const name = STATE_TO_NAME[state]
    return (
        <div className="h-full flex flex-col divide-black divide-y-2">
            <div className="flex divide-black divide-x-2">
                <NamedLogo />
                <StateSelection state={state} getPath={v => `/${v}`} />
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="space-y-8">
                    <div className="text-3xl text-center">
                        <h3>
                            You have selected <code>{JSON.stringify(name)}</code>
                        </h3>
                        <p>Please select a mode to further explore this state.</p>
                    </div>
                    <ol className="flex gap-8 flex-wrap">
                        <li>
                            <Option to={Mode.DISTRICT_PLAN}>See the currently enacted district plan of {name}</Option>
                        </li>
                        <li>
                            <Option to={Mode.MINORITY_DISTRIBUTION}>
                                Visualize the minority distribution of different groups in {name}
                            </Option>
                        </li>
                        <li>
                            <Option to={Mode.OVERVIEW}>
                                Get a breakdown of population distribution, voter behavior, and other analysis in {name}
                            </Option>
                        </li>
                        <li>
                            <Option to={Mode.COMPARE}>
                                Compare the currently enacted district plan in {name} with a randomly generated plan.
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
