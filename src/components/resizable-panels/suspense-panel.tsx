import { Suspense } from "react"
import { Panel, PanelProps } from "react-resizable-panels"
import PanelLoader from "../loader/panel-loader"

export default function SuspensePanel({ children, ...props }: PanelProps) {
    return (
        <Panel {...props}>
            <Suspense fallback={<PanelLoader />}>{children}</Suspense>
        </Panel>
    )
}
