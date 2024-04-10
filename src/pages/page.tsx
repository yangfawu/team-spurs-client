import NamedLogo from "@/components/attribution/named-logo"
import { STATE_TO_NAME, SUPPORTED_STATES } from "@/constants/state"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"

export default function Page() {
    return (
        <div className="h-full flex flex-col divide-black divide-y-2">
            <div>
                <NamedLogo />
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="space-y-8">
                    <h3 className="text-3xl text-center">Select a State</h3>
                    <ol className="flex gap-8 flex-wrap">
                        {SUPPORTED_STATES.map($s => (
                            <li key={$s}>
                                <Option to={$s}>{STATE_TO_NAME[$s]}</Option>
                            </li>
                        ))}
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
    text-xl
    font-semibold
    hover:bg-gray-200 active:bg-gray-500
`
