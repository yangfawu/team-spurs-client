import AssemblyView, { ASSEMBLY_VIEW_TO_NAME, SUPPORTED_ASSEMBLY_VIEWS } from "@/constants/assembly-views"
import { selectActiveModules, setActiveModules } from "@/redux/assembly"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { Fragment, useMemo } from "react"
import tw from "tailwind-styled-components"

export default function Dropdown() {
    const dispatch = useAppDispatch()
    const value = useAppSelector(selectActiveModules)

    const setValue = useMemo(() => {
        return (value: AssemblyView[]) => dispatch(setActiveModules(value))
    }, [dispatch])

    return (
        <div className="w-full">
            <Listbox multiple value={value} onChange={setValue}>
                <div className="relative mt-1">
                    <Button>
                        <span className="block truncate">
                            {value.length === 0 ? `None Selected` : value.map(format).join(", ")}
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
                            {SUPPORTED_ASSEMBLY_VIEWS.map((opt, i) => (
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
                                                {format(opt)}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    {value.indexOf(opt) + 1}
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

const format = (view: AssemblyView) => ASSEMBLY_VIEW_TO_NAME[view]
