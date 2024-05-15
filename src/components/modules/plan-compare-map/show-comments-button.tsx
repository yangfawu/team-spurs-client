import { fetchSeawulfPlanOptions } from "@/api/plan"
import ControlButton from "@/components/leaflet/control-button"
import State from "@/constants/state"
import { Dialog, Transition } from "@headlessui/react"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Fragment, useCallback, useMemo, useState } from "react"
import Control from "react-leaflet-custom-control"
import tw from "tailwind-styled-components"

interface Props {
    state: State
    plan: number
}
export default function ShowCommentsButton({ state, plan }: Props) {
    const { data } = useSuspenseQuery(fetchSeawulfPlanOptions(state))

    const comments = useMemo(() => {
        const target = data.find(e => e.plan === plan)
        if (!target) return []

        return target.comments
    }, [data, plan])

    const [open, setOpen] = useState(false)

    const show = useCallback(() => {
        setOpen(true)
    }, [])

    const hide = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <>
            <Control position="bottomright" prepend>
                <ControlButton key="commments" Icon={ChatBubbleOvalLeftEllipsisIcon} onClick={show}>
                    Show Comments
                </ControlButton>
            </Control>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-[1000]" onClose={hide}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Panel>
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        About Plan #{plan}
                                    </Dialog.Title>
                                    <ul className="mt-2 list-disc list-inside">
                                        {comments.map((comment, i) => (
                                            <li key={i}>{comment}</li>
                                        ))}
                                        <li className="hidden only:block">
                                            <em>No comments yet.</em>
                                        </li>
                                    </ul>
                                    <div className="mt-6 flex justify-end">
                                        <Action type="button" onClick={hide}>
                                            Close
                                        </Action>
                                    </div>
                                </Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

const Panel = tw(Dialog.Panel)`
    w-full max-w-xl 
    transform overflow-hidden 
    rounded-2xl 
    bg-white 
    p-6 
    text-left 
    align-middle 
    shadow-xl 
    transition-all

`

const Action = tw.button`
    inline-flex justify-center 
    rounded-md border border-transparent 
    bg-blue-100 
    px-4 py-2 
    text-sm text-blue-900 font-medium
    hover:bg-blue-200 
    focus:outline-none 
    focus-visible:ring-2 
    focus-visible:ring-blue-500 
    focus-visible:ring-offset-2
`
