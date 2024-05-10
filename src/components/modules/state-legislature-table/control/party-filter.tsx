import Party, { PARTY_TO_NAME, SUPPORTED_PARTIES } from "@/constants/party"
import { useFilterContext } from "../context"
import Dropdown from "./dropdown"

export default function PartyFilter() {
    const { partyFilter, setPartyFilter } = useFilterContext()

    return (
        <Dropdown
            tag="Parties"
            value={partyFilter}
            setValue={setPartyFilter}
            format={format}
            formatShort={formatShort}
            options={SUPPORTED_PARTIES}
        />
    )
}

const format = (value: Party) => PARTY_TO_NAME[value]
const formatShort = (value: Party) => value.toUpperCase()
