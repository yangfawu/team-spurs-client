import Control from "@/components/control"
import Mode from "@/constants/mode"
import { STATE_TO_NAME, isValidState } from "@/constants/state"
import { Link, createLazyFileRoute } from "@tanstack/react-router"
import tw from "tailwind-styled-components"

function Page() {
    const state = Route.useParams({ select: p => p.state })

    if (!isValidState(state)) {
        throw new Error(`Invalid state: ${state}`)
    }

    const name = STATE_TO_NAME[state]
    return (
        <>
            <Control />
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
        </>
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

export const Route = createLazyFileRoute("/$state/_layout/")({
    component: Page
})
