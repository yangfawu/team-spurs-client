import { fetchStateVoterDistribution } from "@/api/summary"
import Party, { PARTY_TO_NAME, SUPPORTED_PARTIES } from "@/constants/party"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import tw from "tailwind-styled-components"

interface Props {
    state: State
}
export default function Info({ state }: Props) {
    const {
        data: { breakdown },
    } = useSuspenseQuery(fetchStateVoterDistribution(state))

    const Bar = useMemo(() => {
        const data = SUPPORTED_PARTIES.map(party => [party, breakdown[party], PARTY_TO_COLOR[party]] as const).filter(
            ([party]) => breakdown[party] > 0,
        )
        data.sort((a, b) => b[1] - a[1])

        const head = data.slice(0, -1)
        const tail = data[data.length - 1]

        return (
            <div className="rounded-full border-2 overflow-hidden flex items-stretch h-5">
                {head.map(([party, percent, color]) => (
                    <div key={party} className={color} style={{ width: `${+(percent * 100).toFixed(2)}%` }} />
                ))}
                <div className={`bg-${tail[2]} flex-1`} />
            </div>
        )
    }, [breakdown, PARTY_TO_COLOR])

    return (
        <div className="space-y-2">
            {Bar}
            <div className="flex gap-2 flex-wrap">
                {SUPPORTED_PARTIES.map(party => (
                    <Stat key={party} className="relative">
                        <div className={`${PARTY_TO_COLOR[party]} absolute inset-0 -z-10 opacity-10`}></div>
                        <h4 className="text-xs font-semibold text-gray-600 uppercase">{PARTY_TO_NAME[party]}</h4>
                        <p className="text-lg py-2 font-bold">{+(breakdown[party] * 100).toFixed(1)} %</p>
                    </Stat>
                ))}
            </div>
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

const PARTY_TO_COLOR: Record<Party, string> = {
    [Party.DEMOCRATIC]: "bg-blue-500",
    [Party.REPUBLICAN]: "bg-red-500",
    [Party.OTHER]: "bg-gray-500",
}
