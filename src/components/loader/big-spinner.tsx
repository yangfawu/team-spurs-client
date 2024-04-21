import tw from "tailwind-styled-components"

export default function BigSpinner() {
    return (
        <Box>
            <Spinner />
        </Box>
    )
}

const Box = tw.div`
    min-h-screen 
    flex items-center justify-center
`

const Spinner = tw.div`
    w-20 h-20
    box-border border-2 border-l-0
    rounded-full border-black
    animate-spin
`
