import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./styles/style.css"
import AppWrapper from "./components/containers/AppWrapper/AppWrapper"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppWrapper />
    </StrictMode>
)
