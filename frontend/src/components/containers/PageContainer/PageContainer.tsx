import type { PageContainerProps } from "./PageContainer.types"

export default function PageContainer({
    children,
    className
}: PageContainerProps) {
    return <div className={className}>{children}</div>
}
