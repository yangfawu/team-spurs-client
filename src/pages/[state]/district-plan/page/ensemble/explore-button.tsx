import Mode from "@/constants/mode"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"

interface Props {
    group: string
}
export default function ExploreButton({ group }: Props) {
    return (
        <Wrapper to={`../${Mode.MINORITY_DISTRIBUTION}/${group}`} relative="path">
            See Distribution
        </Wrapper>
    )
}

const Wrapper = tw(Link)`
    p-2 
    text-sm 
    border rounded-sm 
    bg-green-200 hover:bg-green-400
`
