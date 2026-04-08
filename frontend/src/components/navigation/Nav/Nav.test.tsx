import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"
import Nav from "./Nav"

describe("Nav", () => {
    test("Nav renders correctly", () => {
        render(<Nav />)

        const navElement = screen.getByRole("navigation")
        expect(navElement).toBeInTheDocument()
    })
})
