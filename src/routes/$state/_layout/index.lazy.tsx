import Control from "@/components/control"
import Mode, { MODE_TO_NAME, SUPPORTED_MODES } from "@/constants/mode"
import { STATE_TO_NAME } from "@/constants/state"
import { useSafeCurrentState } from "@/contexts/current-state"
import { Link, createLazyFileRoute } from "@tanstack/react-router"
import tw from "tailwind-styled-components"

function Page() {
    const state = useSafeCurrentState()

    return (
        <>
            <Control />
            <div className="flex-1 flex justify-center p-4">
                <div className="w-full max-w-screen-md divide-y divide-black">
                    <div className="mb-4">
                        <h3 className="text-3xl">Please Select a Mode</h3>
                        <p className="italic">we currently support only these modes for {STATE_TO_NAME[state]}</p>
                    </div>
                    {SUPPORTED_MODES.map($m => (
                        <Option to={$m}>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">{MODE_TO_NAME[$m]}</h3>
                                <h4>{MODE_DESCRIPTIONS[$m]}</h4>
                            </div>
                            <p className="text-lg">{`→`}</p>
                        </Option>
                    ))}
                    <div />
                </div>
            </div>
        </>
    )
}

const Option = tw(Link)`
    block
    transition
    px-4 py-2
    flex items-center gap-4
    hover:bg-gray-200 active:bg-gray-500
`

const MODE_DESCRIPTIONS: Record<Mode, string> = {
    [Mode.ASSEMBLY]: "View the state assembly districts of this state and summary of its other statistics.",
    [Mode.HEAT]: "View a heat map of the state based on a selected group.",
    [Mode.COMPARE]: "Compare the currently enacted district plan in this state with a randomly generated plan.",
    [Mode.GINGLES]: "View the Gingles 2/3 Analysis of this state.",
    [Mode.ECOLOGICAL_INFERENCE]: "View the Ecological Inference of this state's elections based on a selected group.",
}

export const Route = createLazyFileRoute("/$state/_layout/")({
    component: Page,
})
