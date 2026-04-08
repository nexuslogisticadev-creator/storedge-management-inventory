import { render, screen } from "@testing-library/react"
import { expect, vi, test, describe } from "vitest"
import userEvent from "@testing-library/user-event"
import RegisterPage from "./RegisterPage"

describe("RegisterPage", () => {
    test("should render the title", () => {
        render(<RegisterPage setAuthenticated={vi.fn()} />)

        expect(
            screen.getByRole("heading", { name: /cadastro/i })
        ).toBeInTheDocument()
    })

    test("should render name, email and password inputs", () => {
        render(<RegisterPage setAuthenticated={vi.fn()} />)

        expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
    })

    test("should render the register button", () => {
        render(<RegisterPage setAuthenticated={vi.fn()} />)

        expect(
            screen.getByRole("button", { name: /cadastrar/i })
        ).toBeInTheDocument()
    })

    test("should allow typing into inputs", async () => {
        const user = userEvent.setup()
        render(<RegisterPage setAuthenticated={vi.fn()} />)

        const nameInput = screen.getByPlaceholderText(/nome/i)
        const emailInput = screen.getByPlaceholderText(/e-mail/i)
        const passwordInput = screen.getByPlaceholderText(/senha/i)

        await user.type(nameInput, "vortex")
        await user.type(emailInput, "vortex@email.com")
        await user.type(passwordInput, "123456")

        expect(nameInput).toHaveValue("vortex")
        expect(emailInput).toHaveValue("vortex@email.com")
        expect(passwordInput).toHaveValue("123456")
    })

    test("should not crash on form submit", async () => {
        const user = userEvent.setup()
        render(<RegisterPage setAuthenticated={vi.fn()} />)

        const button = screen.getByRole("button", { name: /cadastrar/i })

        await user.click(button)

        // como não há handler, apenas garantimos que não quebra
        expect(button).toBeInTheDocument()
    })
})
