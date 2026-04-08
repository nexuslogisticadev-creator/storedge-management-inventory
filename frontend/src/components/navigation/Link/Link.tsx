import type { LinkProps } from './Link.types'

export default function Link({ className, href, children, target }: LinkProps) {
    return (
        <a
            className={`${className} flex justify-center items-center`}
            target={target}
            href={href}
        >
            {children}
        </a>
    )
}
