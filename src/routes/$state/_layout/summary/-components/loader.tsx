import tw from "tailwind-styled-components"

export default function Loader() {
    return (
        <Grid>
            <Panel className="col-span-3 row-span-3" />
            <Panel className="col-span-2 row-span-1" />
            <Panel className="col-span-2 row-span-2" />
            <Panel className="col-span-3 row-span-1" />
            <Panel className="col-span-2 row-span-1" />
        </Grid>
    )
}

export const Grid = tw.div`
    grid gap-2 p-2
    grid-cols-5 grid-rows-4
    h-full 
    bg-gray-300
    animate-pulse
`

export const Panel = tw.div`
    bg-gray-400
    rounded
`
