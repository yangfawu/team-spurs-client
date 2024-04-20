import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectConfig, updateConfig } from "@/redux/state-selection"
import { Suspense, lazy, useMemo } from "react"
import tw from "tailwind-styled-components"
import ComplexLoader from "./complex-loader"
import SimpleLoader from "./simple-loader"
import Switch from "./switch"

const Complex = lazy(() => import("./complex"))
const Simple = lazy(() => import("./simple"))

export default function App() {
    const { useSimpleInterface: active } = useAppSelector(selectConfig)
    const dispatch = useAppDispatch()

    const update = useMemo(() => {
        return (newValue: boolean) => {
            dispatch(updateConfig(newValue))
        }
    }, [])

    return (
        <div className="flex-1 relative flex flex-col">
            <Suspense fallback={active ? <SimpleLoader /> : <ComplexLoader />}>
                {active ? <Simple /> : <Complex />}
            </Suspense>
            <Control>
                <p>
                    <b>{active ? "Simplified" : "Map"}</b> View
                </p>
                <Switch active={active} setActive={update} />
            </Control>
        </div>
    )
}

const Control = tw.div`
    absolute z-[1200] top-2 right-2
    flex items-center gap-2
    px-2 py-1 
    rounded-full
    bg-white
    shadow
`
