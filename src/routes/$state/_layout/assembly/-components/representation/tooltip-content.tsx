import { ReactNode } from "@tanstack/react-router"

interface Props {
    title: ReactNode
    value: number
}
export default function TooltipContent({ title, value }: Props) {
    return (
        <div className="bg-white shadow p-2">
            <p>{title}</p>
            <p>
                <span className="font-semibold">Count:</span> {value}
            </p>
        </div>
    )
}
