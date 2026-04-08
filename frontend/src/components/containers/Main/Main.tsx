import type { MainProps } from "./Main.types"

export default function Main({ className, children }: MainProps) {
    return <main className={className}>{children}</main>
}
