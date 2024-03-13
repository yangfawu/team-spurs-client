import RouterLink from "@/components/router-link"

export default function Page() {
    return (
        <div>
            <h1>Product Page</h1>
            <ol className="list-decimal list-inside	">
                <li>
                    <RouterLink to="item-1">Item 1</RouterLink>
                </li>
                <li>
                    <RouterLink to="item-2">Item 1</RouterLink>
                </li>
                <li>
                    <RouterLink to="item-3">Item 1</RouterLink>
                </li>
            </ol>
        </div>
    )
}
