import NamedLogo from "@/components/attribution/named-logo"
import HorizontalDivider from "@/components/horizontal-divider"
import VerticalDivider from "@/components/vertical-divider"
import { SUPPORTED_STATE_ENTRIES } from "@/constants/states"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"

export default function Page() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center">
                <NamedLogo />
                <VerticalDivider />
            </div>
            <HorizontalDivider />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="space-y-8">
                    <h3 className="text-3xl text-center">Select a State</h3>
                    <ol className="flex gap-8 flex-wrap">
                        {SUPPORTED_STATE_ENTRIES.map(([key, name]) => (
                            <li key={key}>
                                <Option to={key} className="">{name}</Option>
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
