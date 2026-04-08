import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"

import Container from "./Container"

describe("Container", () => {
    test("Container renders correclty", () => {
        render(
            <Container>
                <h1>Hello World</h1>
            </Container>
        )

        const titleElement = screen.getByRole("heading")
        expect(titleElement).toBeInTheDocument()
    })
})
