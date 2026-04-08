import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"
import Footer from "./Footer"

describe("Footer", () => {
    test("Footer renders correctly", () => {
        render(
            <Footer>
                <h1>Test</h1>
            </Footer>
        )

        const titleElement = screen.getByRole("heading")
        expect(titleElement).toBeInTheDocument()
    })
})
