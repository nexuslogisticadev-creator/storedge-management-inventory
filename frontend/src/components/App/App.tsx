import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom"

import type { AppProps } from "./App.types"

// Pages
import RegisterPage from "../../pages/RegisterPage/RegisterPage"
import WelcomePage from "../../pages/WelcomePage/WelcomePage"
import LoginPage from "../../pages/LoginPage/LoginPage"

export default function App({ authenticated, setAuthenticated }: AppProps) {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route
                    path="/login"
                    element={<LoginPage setAuthenticated={setAuthenticated} />}
                />
                <Route
                    path="/registro"
                    element={
                        <RegisterPage setAuthenticated={setAuthenticated} />
                    }
                />
            </Routes>
        </Router>
    )
}
