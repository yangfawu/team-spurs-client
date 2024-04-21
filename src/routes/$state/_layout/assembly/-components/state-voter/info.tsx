import { fetchVoterInfo } from "@/api/assembly"
import { PARTY_TO_NAME, SUPPORTED_PARTIES } from "@/constants/party"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useSuspenseQuery } from "@tanstack/react-query"
import tw from "tailwind-styled-components"

export default function Info() {
    const state = useSafeCurrentState()
    const {
        data: { breakdown },
    } = useSuspenseQuery(fetchVoterInfo(state))

    return (
        <div className="flex gap-2 flex-wrap">
            {SUPPORTED_PARTIES.map(party => (
                <Stat>
                    <h4 className="text-sm font-semibold text-gray-600 uppercase">% {PARTY_TO_NAME[party]}</h4>
                    <p className="text-2xl py-2 font-bold">{breakdown[party]}</p>
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
