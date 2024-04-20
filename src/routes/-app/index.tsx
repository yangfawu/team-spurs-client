import { Switch } from "@headlessui/react"
import { Suspense, useState } from "react"
import tw from "tailwind-styled-components"
import Complex from "./complex"
import Simple from "./simple"

export default function App() {
    const [isSimple, setSimple] = useState(() => {
        return localStorage.getItem(IS_SIMPLE_KEY) === "true"
    })

    const setSimpleWithStorage = (value: boolean) => {
        localStorage.setItem(IS_SIMPLE_KEY, value.toString())
        setSimple(value)
    }

    return (
        <div className="flex-1 relative flex flex-col">
            <Suspense fallback={<p>Loading...</p>}>{isSimple ? <Simple /> : <Complex />}</Suspense>
            <Control>
                <p>
                    <b>{isSimple ? "Simplified" : "Map"}</b> View
                </p>
                <MySwitch
                    checked={isSimple}
                    onChange={setSimpleWithStorage}
                    className={isSimple ? "bg-teal-900" : "bg-teal-700"}
                >
                    <Ball aria-hidden="true" className={isSimple ? "translate-x-0" : "translate-x-[16px]"} />
                </MySwitch>
            </Control>
        </div>
    )
}

const Control = tw.div`
    absolute z-[500] top-2 right-2
    flex items-center gap-2
    px-2 py-1 
    rounded-full
    bg-white
    shadow
`

const MySwitch = tw(Switch)`
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

const IS_SIMPLE_KEY = "app-root-is-simple"
