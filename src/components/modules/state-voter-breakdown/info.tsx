import { fetchStateVoterDistribution } from "@/api/assembly"
import { PARTY_TO_NAME, SUPPORTED_PARTIES } from "@/constants/party"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import tw from "tailwind-styled-components"

interface Props {
    state: State
}
export default function Info({ state }: Props) {
    const {
        data: { breakdown },
    } = useSuspenseQuery(fetchStateVoterDistribution(state))

    return (
        <div className="flex gap-2 flex-wrap">
            {SUPPORTED_PARTIES.map(party => (
                <Stat key={party}>
                    <h4 className="text-sm font-semibold text-gray-600 uppercase">% {PARTY_TO_NAME[party]}</h4>
                    <p className="text-2xl py-2 font-bold">{(breakdown[party] * 100).toFixed(3)}</p>
                </Stat>
            ))}
        </div>
    )
}

const Stat = tw.div`
    flex-1
    p-2
    border
    rounded
    flex flex-col items-center
    min-w-32
`
