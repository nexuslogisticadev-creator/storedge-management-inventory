import type { ContainerProps } from "./Container.types"

export default function Container({ className, children }: ContainerProps) {
    return <div className={className}>{children}</div>
}
