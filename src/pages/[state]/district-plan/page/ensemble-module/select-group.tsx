import {
    SUPPORTED_ETHNICITY_DIRECTORY,
    SUPPORTED_ETHNICITY_ENTRIES,
    SupportedEthnicityKey,
} from "@/constants/ethnicities"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { Fragment, useMemo } from "react"
import tw from "tailwind-styled-components"

interface Props {
    group: SupportedEthnicityKey
    setGroup: (newGroup: SupportedEthnicityKey) => any
}
export default function SelectGroup({ group, setGroup }: Props) {
    const selectedName = useMemo(() => {
        return SUPPORTED_ETHNICITY_DIRECTORY[group] || "Unknown"
    }, [group])

    return (
        <Listbox value={group} onChange={setGroup}>
            <div className="relative flex-1">
                <MySelectButton>
                    <span className="block truncate">{selectedName}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                </MySelectButton>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <MySelectOptions>
                        {SUPPORTED_ETHNICITY_ENTRIES.map(([key, name]) => (
                            <MySelectOption key={key} value={key}>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5 hidden ui-selected:block" />
                                </span>
                                {name}
                            </MySelectOption>
                        ))}
                    </MySelectOptions>
                </Transition>
            </div>
        </Listbox>
    )
}

const MySelectButton = tw(Listbox.Button)`
    relative
    cursor-pointer 
    border rounded-sm 
    py-2 pl-3 pr-10 
    text-left text-sm
    w-full
`

const MySelectOptions = tw(Listbox.Options)`
    absolute 
    mt-1 py-1
    max-h-60 w-full 
    overflow-auto 
    rounded-md 
    bg-white 
    text-base text-sm
    shadow-lg ring-1 ring-black/5
`

const MySelectOption = tw(Listbox.Option)`
    relative 
    cursor-default select-none 
    py-2 pl-10 pr-4
    ui-active:bg-blue-500 ui-active:text-white 
    ui-not-active:bg-white ui-not-active:text-black
`
