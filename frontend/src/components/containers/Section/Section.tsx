import type { SectionProps } from "./Section.types"

export default function Section({ className, children, id }: SectionProps) {
    return (
        <section className={className} id={id}>
            {children}
        </section>
    )
}
