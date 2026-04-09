import { useState } from "react"

import App from "../../App/App"
import { Toaster } from "@/components/ui/toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function AppWrapper() {
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <App
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
            />
            <Toaster />
        </QueryClientProvider>
    )
}
