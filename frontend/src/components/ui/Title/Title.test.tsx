import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"

import Title from "./Title"

describe("Title", () => {
    test("Title renders correctly with level 1", () => {
        render(<Title level={1}>Title</Title>)

        const titleElement = screen.getByRole("heading", { level: 1 })
        expect(titleElement).toBeInTheDocument()
    })

    test("Title renders correctly with level 2", () => {
        render(<Title level={2}>Title</Title>)

        const titleElement = screen.getByRole("heading", { level: 2 })
        expect(titleElement).toBeInTheDocument()
    })
})
