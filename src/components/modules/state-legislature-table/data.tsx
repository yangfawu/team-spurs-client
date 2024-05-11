import { Representative } from "@/api/assembly"
import { GROUP_TO_NAME } from "@/constants/group"
import { PARTY_TO_NAME } from "@/constants/party"
import { createColumnHelper } from "@tanstack/react-table"
import tw from "tailwind-styled-components"

const ch = createColumnHelper<Representative>()
export const COLUMNS = [
    ch.accessor("district", {
        header: () => "District",
        cell: c => c.getValue(),
    }),
    ch.accessor(({ first_name, last_name, image }) => [first_name, last_name, image] as const, {
        id: "representative",
        header: () => <div className="text-left">Representative</div>,
        cell: c => {
            const [fname, lname, src] = c.getValue()
            const name = `${fname} ${lname}`
            return (
                <div className="px-1 flex items-center gap-2 group">
                    <ProfileImg src={src} alt={name} />
                    <p>{name}</p>
                </div>
            )
        },
    }),
    ch.accessor("race", {
        header: () => "Race(s)",
        cell: c =>
            c
                .getValue()
                .map($g => GROUP_TO_NAME[$g])
                .join(", "),
    }),
    ch.accessor("party", {
        header: () => "Party",
        cell: c => PARTY_TO_NAME[c.getValue()],
    }),
    ch.accessor("vote_margin", {
        header: () => "Vote Margin",
        cell: c => {
            return `${+(c.getValue() * 100).toFixed(1)}%`
        },
    }),
]

const ProfileImg = tw.img`
    w-12 h-12
    object-contain
    bg-gray-400
    rounded-full
    hover:scale-[3]
    hover:shadow-lg
`
