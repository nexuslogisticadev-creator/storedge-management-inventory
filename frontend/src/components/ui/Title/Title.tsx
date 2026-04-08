import type { TitleProps } from "./Title.types"

const map = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6"
} as const

export default function Title({ level, children, className }: TitleProps) {
    const Tag = map[level]

    return <Tag className={className}>{children}</Tag>
}
