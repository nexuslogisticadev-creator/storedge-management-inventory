import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button';

export const Link = ({
    className,
    variant = 'default',
    size = 'default',
    ...props
}: React.ComponentProps<'a'> & VariantProps<typeof buttonVariants>) => {
    return (
        <a
            className={buttonVariants({ variant, size, className })}
            {...props}
        />
    );
};
