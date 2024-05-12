import Mode from "@/constants/mode"
import { STATE_TO_NAME, SUPPORTED_STATES } from "@/constants/state"
import { Link } from "@tanstack/react-router"
import tw from "tailwind-styled-components"

export default function Simple() {
    return (
        <div className="flex-1 flex justify-center p-4">
            <div className="w-full max-w-screen-md divide-y divide-black">
                <div className="mb-4">
                    <h3 className="text-3xl">Please Select a State</h3>
                    <p className="italic">we currently support only these states</p>
                </div>
                {SUPPORTED_STATES.map($s => (
                    <Option key={$s} to={`/$state/${Mode.SUMMARY}`} params={{ state: $s }}>
                        <span>{STATE_TO_NAME[$s]}</span>
                        <span>{`→`}</span>
                    </Option>
                ))}
                <div />
            </div>
        </div>
    )
}

const Option = tw(Link)`
    block
    transition
    flex items-center justify-between
    px-4 py-2
    text-xl
    font-semibold
    hover:bg-gray-200 active:bg-gray-500
`
