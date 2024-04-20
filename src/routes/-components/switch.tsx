import { Switch as TheirSwitch } from "@headlessui/react"
import tw from "tailwind-styled-components"

interface Props {
    active: boolean
    setActive: (value: boolean) => any
}
export default function Switch({ active, setActive }: Props) {
    return (
        <MySwitch checked={active} onChange={setActive} className={active ? "bg-teal-900" : "bg-teal-700"}>
            <Ball aria-hidden="true" className={active ? "translate-x-0" : "translate-x-[16px]"} />
        </MySwitch>
    )
}

const MySwitch = tw(TheirSwitch)`
    relative 
    inline-flex shrink-0 
    h-[19px] w-[35px] 
    cursor-pointer 
    rounded-full 
    border-2 border-transparent 
    transition-colors duration-200 ease-in-out 
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
`

const Ball = tw.span`
    pointer-events-none 
    inline-block 
    h-[16px] w-[16px] 
    transform translate-x-0 
    rounded-full 
    bg-white 
    shadow-lg ring-0 
    transition duration-200 ease-in-out
`
