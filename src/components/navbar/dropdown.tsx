import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { ReactNode } from "react"
import tw from "tailwind-styled-components"

interface Props {
    current?: ReactNode
    children?: ReactNode
}
export default function Dropdown({ current, children }: Props) {
    return (
        <div className="flex items-center justify-center p-2">
            <Menu as="div" className="relative inline-block text-left">
                <Button>
                    {current}
                    <ChevronDownIcon className="h-5 w-5" />
                </Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Items>{children}</Items>
                </Transition>
            </Menu>
        </div>
    )
}

const Button = tw(Menu.Button)`
    inline-flex justify-center items-center gap-2
    rounded-sm 
    text-lg font-semibold
`

const Items = tw(Menu.Items)`
    absolute left-0
    origin-top-left
    -ml-2 mt-2 min-w-40
    shadow-xl
    bg-white
    border rounded-md
    divide-y
    z-[500]
`

Dropdown.Option = tw.div`
    px-2 py-1
    text-md
    transition-colors
    active:bg-gray-600
    first:rounded-tl-sm
    first:rounded-tr-sm
    last:rounded-bl-sm
    last:rounded-br-sm
`
