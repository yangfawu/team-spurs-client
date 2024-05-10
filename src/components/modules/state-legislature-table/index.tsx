import State from "@/constants/state"
import tw from "tailwind-styled-components"
import Content from "./content"
import { ContextProvider } from "./context"

interface Props {
    state: State
}
export default function StateLegislatureTable({ state }: Props) {
    return (
        <Container>
            <h3 className="p-2 text-lg font-bold">State Assembly Members</h3>
            <ContextProvider>
                <Content state={state} />
            </ContextProvider>
        </Container>
    )
}

const Container = tw.div`
    relative
    h-full
    overflow-auto scroll-pt-7
    flex flex-col items-stretch
`
