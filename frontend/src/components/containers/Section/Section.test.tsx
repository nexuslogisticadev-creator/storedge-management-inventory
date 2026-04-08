import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"

import Section from "./Section"

describe("Section", () => {
    test("Section renders correctly", () => {
        render(
            <Section id="test">
                <h1>Test</h1>
            </Section>
        )

        const titleElement = screen.getByRole("heading")
        expect(titleElement).toBeInTheDocument()
    })
})
