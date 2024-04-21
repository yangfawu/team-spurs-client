import tw from "tailwind-styled-components";

export default function Loader() {
    return (
        <Box>
            <p>Loading heat map...</p>
        </Box>
    )
}

const Box = tw.div`
    absolute
    inset-0
    bg-black/20
    flex items-center justify-center
    text-white text-2xl
`
