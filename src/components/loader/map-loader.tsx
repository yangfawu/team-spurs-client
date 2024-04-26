import tw from "tailwind-styled-components"

export default function MapLoader() {
    return (
        <Box>
            <BouncingBall />
            <BouncingBall />
            <BouncingBall />
        </Box>
    )
}

const Box = tw.div`
    absolute z-[400]
    inset-0
    bg-black/20
    p-8
    flex items-center justify-center gap-16
    text-white text-2xl
`

const BouncingBall = tw.div`
    w-8 h-8
    bg-gray-400 rounded-full
    animate-ping
`
