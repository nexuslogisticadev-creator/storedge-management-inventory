import { render, screen } from "@testing-library/react"
import { expect, vi, test, describe } from "vitest"
import userEvent from "@testing-library/user-event"
import LoginPage from "./LoginPage"

describe("LoginPage", () => {
    test("should render the title", () => {
        render(<LoginPage setAuthenticated={vi.fn()} />)

        expect(
            screen.getByRole("heading", { name: /login/i })
        ).toBeInTheDocument()
    })

    test("should render name and password inputs", () => {
        render(<LoginPage setAuthenticated={vi.fn()} />)

        expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
    })

    test("should render the login button", () => {
        render(<LoginPage setAuthenticated={vi.fn()} />)

        expect(
            screen.getByRole("button", { name: /login/i })
        ).toBeInTheDocument()
    })

    test("should allow typing into inputs", async () => {
        const user = userEvent.setup()
        render(<LoginPage setAuthenticated={vi.fn()} />)

        const nameInput = screen.getByPlaceholderText(/nome/i)
        const passwordInput = screen.getByPlaceholderText(/senha/i)

        await user.type(nameInput, "vortex")
        await user.type(passwordInput, "123456")

        expect(nameInput).toHaveValue("vortex")
        expect(passwordInput).toHaveValue("123456")
    })

    test("should not crash on form submit", async () => {
        const user = userEvent.setup()
        render(<LoginPage setAuthenticated={vi.fn()} />)

        const button = screen.getByRole("button", { name: /login/i })

        await user.click(button)

        // como não há handler, apenas garantimos que não quebra
        expect(button).toBeInTheDocument()
    })
})
