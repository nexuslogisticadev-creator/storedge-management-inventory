import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"

import Img from "./Img"

describe("Img", () => {
    test("Img renders correctly", () => {
        render(<Img alt="test" src="test" />)

        const imgElement = screen.getByAltText("test")
        expect(imgElement).toBeInTheDocument()
    })
})
