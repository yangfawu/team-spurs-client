import Group from "@/constants/group"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/$state/_layout/minority-distribution/_layout/")({
    loader: ({ params: { state } }) => {
        throw redirect({
            to: "/$state/minority-distribution/$group",
            params: { state, group: Group.WHITE },
        })
    },
})
