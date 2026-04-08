import type { WelcomePageProps } from "./WelcomePage.types"

import PageContainer from "../../components/containers/PageContainer/PageContainer"
import Nav from "../../components/navigation/Nav/Nav"


export default function WelcomePage({ setAuthenticated } : WelcomePageProps ) {
    return (
        <PageContainer>
            <Nav />
        </PageContainer>
    )
}
