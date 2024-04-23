import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react"
import tw from "tailwind-styled-components"

interface Props<T> {
    tag: string
    options: T[]
    value: T | null
    setValue: (value: T) => any
}
export default function Dropdown<T>({ tag, options, value, setValue }: Props<T>) {
    return (
        <div className="flex-1 min-w-40">
            <Listbox value={value} onChange={setValue}>
                <div className="relative">
                    <Button>
                        <span className="block truncate">
                            {value === null ? `No ${tag} Selected` : `${tag}: ${value}`}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Options>
                            {options.map((opt, i) => (
                                <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                        }`
                                    }
                                    value={opt}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                                            >
                                                {String(opt)}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

const Button = tw(Listbox.Button)`
    relative 
    w-full
    py-2 pl-3 pr-10 
    text-left sm:text-sm
    border rounded-sm
    bg-white 
`

const Options = tw(Listbox.Options)`
    absolute -bottom-2 z-[200]
    transform translate-y-full
    max-h-40 w-full 
    overflow-auto 
    rounded-md 
    bg-white 
    py-1 
    text-base sm:text-sm
    shadow-lg ring-1 ring-black/5 
    focus:outline-none
`
