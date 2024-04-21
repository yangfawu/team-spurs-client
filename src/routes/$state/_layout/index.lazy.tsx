import Control from "@/components/control"
import { MODE_DESCRIPTIONS, MODE_TO_NAME, SUPPORTED_MODES } from "@/constants/mode"
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
                        <Option key={$m} to={$m}>
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

export const Route = createLazyFileRoute("/$state/_layout/")({
    component: Page,
})
