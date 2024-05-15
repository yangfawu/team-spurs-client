import { useDistrictShowcase } from "@/contexts/district-showcase"
import { useCallback } from "react"
import tw from "tailwind-styled-components"

export default function ClearButton() {
    const { districts, setDistricts } = useDistrictShowcase()

    const clear = useCallback(() => {
        setDistricts([])
    }, [])

    if (districts.length < 1) return null

    return <Button onClick={clear}>Clear Highlights [{districts.length}]</Button>
}

const Button = tw.button`
    text-sm
    px-2 py-1
    font-semibold
    border rounded
    shadow
    bg-red-500/20
`
