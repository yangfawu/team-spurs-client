import { fetchRedistrictingInfo } from "@/api/assembly"
import State from "@/constants/state"
import { LinkIcon } from "@heroicons/react/20/solid"
import { useSuspenseQuery } from "@tanstack/react-query"
import tw from "tailwind-styled-components"

interface Props {
    state: State
}
export default function Info({ state }: Props) {
    const {
        data: { name, website, comments },
    } = useSuspenseQuery(fetchRedistrictingInfo(state))

    return (
        <div className="space-y-1">
            <h3 className="font-semibold">
                <Link href={website}>
                    <span>{name}</span>
                    <LinkIcon className="w-3 h-3" />
                </Link>
            </h3>
            <p className="text-sm p-2 bg-gray-100 border-l-4 border-l-gray-600">{comments}</p>
        </div>
    )
}

const Link = tw.a`
    flex items-center gap-1
    text-blue-500
    hover:underline
    hover:text-blue-700
    active:text-blue-900
    visited:text-purple-500
    transition
`
Link.defaultProps = {
    rel: "noopener noreferrer",
    target: "_blank",
}
