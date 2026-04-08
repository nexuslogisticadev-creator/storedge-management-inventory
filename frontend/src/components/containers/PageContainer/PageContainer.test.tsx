import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"

import PageContainer from "./PageContainer"

describe("PageContainer", () => {
    test("PageContainer renders correctly", () => {
        render(
            <PageContainer>
                <h1>Test</h1>
            </PageContainer>
        )

        const titleElement = screen.getByRole("heading")
        expect(titleElement).toBeInTheDocument()
    })
})
