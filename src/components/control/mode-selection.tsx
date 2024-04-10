import Mode, { MODE_TO_NAME, SUPPORTED_MODES } from "@/constants/mode"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"

interface Props {
    mode: Mode
    getPath: (value: string) => string
}
export default function ModeSelection({ mode, getPath }: Props) {
    return (
        <div className="flex items-center justify-center p-2">
            <Menu as="div" className="relative inline-block text-left">
                <MyMenuButton>
                    {MODE_TO_NAME[mode]}
                    <ChevronDownIcon className="h-5 w-5" />
                </MyMenuButton>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <MyMenuItems>
                        {SUPPORTED_MODES.map($m => (
                            <Menu.Item key={$m} as={Fragment}>
                                {({ active }) => (
                                    <Option className={`${active && "bg-gray-300"}`} to={getPath($m)} relative="path">
                                        {MODE_TO_NAME[$m]}
                                    </Option>
                                )}
                            </Menu.Item>
                        ))}
                    </MyMenuItems>
                </Transition>
            </Menu>
        </div>
    )
}

const MyMenuButton = tw(Menu.Button)`
    inline-flex justify-center items-center gap-2
    rounded-sm 
    text-lg font-semibold
`

const MyMenuItems = tw(Menu.Items)`
    absolute left-0
    origin-top-left
    -ml-2 mt-2 
    w-full min-w-40 max-w-56
    shadow-xl
    bg-white
    border rounded-md
    divide-y
    z-[500]
`

const Option = tw(Link)`
    block
    px-2 py-1
    text-md
    transition-colors
    active:bg-gray-600
    first:rounded-tl-sm
    first:rounded-tr-sm
    last:rounded-bl-sm
    last:rounded-br-sm
    disabled:bg-gray-300
`
