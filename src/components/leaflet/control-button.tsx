import type { ElementType, HTMLAttributes } from "react"
import tw from "tailwind-styled-components"

interface Props extends HTMLAttributes<HTMLButtonElement> {
    Icon: ElementType
}
export default function ControlButton({ Icon, children, ...props }: Props) {
    return (
        <Wrapper {...props}>
            <Tooltip>{children}</Tooltip>
            <IconBox>
                <Icon className="w-6 h-6 text-white" />
            </IconBox>
        </Wrapper>
    )
}

const Wrapper = tw.button`
    font-normal rounded-md
    group
    flex items-center
    bg-transparent hover:bg-gray-800
    active:bg-gray-700
    transition-colors
`

const Tooltip = tw.span`
    opacity-0
    group-hover:opacity-100
    text-sm text-white
    pl-3
    transition-opacity
`

const IconBox = tw.div`
    p-2
    bg-gray-800 group-active:bg-gray-700
    rounded-full group-hover:rounded-md
    transition-all
`
