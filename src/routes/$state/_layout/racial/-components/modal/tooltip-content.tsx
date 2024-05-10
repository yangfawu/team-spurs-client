import { ReactNode } from "@tanstack/react-router"

interface Props {
    title: ReactNode
    value: number
    format: (value: number) => string
}
export default function TooltipContent({ title, value, format }: Props) {
    return (
        <div className="bg-white shadow p-2">
            <p>{title}</p>
            <p>
                <span className="font-semibold">Count:</span> {format(value)}
            </p>
        </div>
    )
}
