import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"

import Main from "./Main"

describe("Main", () => {
    test("Main renders correctly", () => {
        render(
            <Main>
                <h1>Test</h1>
            </Main>
        )

        const mainElement = screen.getByRole("main")
        expect(mainElement).toBeInTheDocument()

        const titleElement = screen.getByRole("heading")
        expect(titleElement).toBeInTheDocument()
    })
})
