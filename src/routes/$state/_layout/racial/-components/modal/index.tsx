import { selectModal, unfeatureDemographic } from "@/redux/heat"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import tw from "tailwind-styled-components"
import Chart from "./chart"
import { useCallback } from "react"

export default function Modal() {
    const data = useAppSelector(selectModal)

    const dispatch = useAppDispatch()
    const close = useCallback(() => {
        dispatch(unfeatureDemographic())
    }, [])

    if (data === null) return null

    return (
        <div className="fixed z-[2000] inset-0">
            <Overlay onClick={close} />
            <Container>
                <Panel>
                    <h3 className="text-lg font-semibold">Demographic Breakdown of {data.title}</h3>
                    <Chart data={data.breakdown} />
                </Panel>
            </Container>
        </div>
    )
}

const Overlay = tw.div`
    absolute inset-0
    bg-black/50
    flex items-center justify-center
`

const Container = tw.div`
    absolute top-1/2 left-1/2
    transform -translate-x-1/2 -translate-y-1/2
    p-4
    w-full max-w-screen-sm
    h-full max-h-96
    box-border
`

const Panel = tw.div`
    bg-white
    rounded
    p-4
    h-full
    w-full
    flex flex-col items-stretch gap-4
`
