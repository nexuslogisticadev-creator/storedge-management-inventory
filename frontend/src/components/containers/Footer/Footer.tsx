import type { FooterProps } from "./Footer.types"

export default function Footer({ className, children }: FooterProps) {
    return <footer className={className}>{children}</footer>
}
