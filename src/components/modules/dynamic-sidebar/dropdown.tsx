import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { Fragment, useMemo } from "react"
import tw from "tailwind-styled-components"
import { useSidebarContext } from "./context"

export default function Dropdown() {
    const { modules, options, setModules, map } = useSidebarContext()

    const valueString = useMemo(() => {
        if (modules.length < 1) return "None Selected"
        return modules
            .map(map.get, map)
            .map(opt => opt?.name || "Untitled")
            .join(", ")
    }, [modules, map])

    return (
        <div className="w-full">
            <Listbox multiple value={modules} onChange={setModules}>
                <div className="relative">
                    <Button>
                        <span className="block truncate">{valueString}</span>
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
                            {options.map(opt => (
                                <Listbox.Option
                                    key={opt.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                        }`
                                    }
                                    value={opt.id}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                                            >
                                                {opt.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    {modules.indexOf(opt.id) + 1}
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
    absolute z-[200]
    max-h-40 w-full 
    overflow-auto 
    rounded-md 
    bg-white 
    mt-2
    py-1 
    text-base sm:text-sm
    shadow-lg ring-1 ring-black/5 
    focus:outline-none
`
