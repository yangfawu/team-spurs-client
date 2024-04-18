import { useAppSelector } from "@/redux/hooks"
import { selectApp } from "@/redux/showcase"
import { Suspense } from "react"
import tw from "tailwind-styled-components"
import Chart from "./chart"

export default function DistrictDemographic() {
    const { district } = useAppSelector(selectApp)

    if (district === undefined) {
        return (
            <Container>
                <h3 className="text-lg font-bold">District Demographic</h3>
                <div className="flex-1 bg-gray-300 p-4 flex justify-center items-center">
                    <p className="text-center">Select a district to see data.</p>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <h3 className="text-lg font-bold">District {district} Demographic</h3>
            <Suspense fallback="Loading...">
                <Chart district={district} />
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    flex flex-col gap-2
    w-full h-full p-2 
    overflow-auto
`
