import { useState } from "react"

import App from "../../App/App"


export default function AppWrapper() {
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    return <App
            setAuthenticated={setAuthenticated}
            authenticated={authenticated}
        />
}
