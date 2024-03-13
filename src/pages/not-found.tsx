export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="text-center">
                <h3 className="text-3xl font-bold">Vite + React</h3>
                <h4 className="text-xl italic">Page Not Found</h4>
                <div className="mt-8">
                    <a
                        className="text-blue-600 underline-1 hover:underline"
                        href="/"
                    >
                        Return Home
                    </a>
                </div>
            </div>
        </div>
    )
}
