import Party, { PARTY_TO_NAME, SUPPORTED_PARTIES } from "@/constants/party"
import { selectLegislature, setPartyFilter } from "@/redux/assembly"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useMemo } from "react"
import Dropdown from "./dropdown"

const format = (value: Party) => PARTY_TO_NAME[value]
const formatShort = (value: Party) => value.toUpperCase()

export default function PartyFilter() {
    const { parties } = useAppSelector(selectLegislature)

    const dispatch = useAppDispatch()
    const setParties = useMemo(() => {
        return (value: Party[]) => {
            dispatch(setPartyFilter(value))
        }
    }, [])

    return (
        <Dropdown
            tag="Parties"
            value={parties}
            setValue={setParties}
            format={format}
            formatShort={formatShort}
            options={SUPPORTED_PARTIES}
        />
    )
}
