import { lazy, useCallback, useState } from "react"
import tw from "tailwind-styled-components"

const Map = lazy(() => import("./map"))

export default function Complex() {
    const [open, setOpen] = useState(true)

    const close = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <>
            <Map />
            {open && (
                <Overlay>
                    <h1 className="text-3xl font-semibold text-gray-100">Please Select a State</h1>
                    <Action onClick={close}>Get Started</Action>
                </Overlay>
            )}
        </>
    )
}

const Overlay = tw.div`
    absolute inset-0 z-[500]
    flex flex-col items-center justify-center gap-4
    bg-black/40
`

const Action = tw.button`
    px-4 py-2
    rounded-lg
    bg-white hover:bg-gray-300
`
