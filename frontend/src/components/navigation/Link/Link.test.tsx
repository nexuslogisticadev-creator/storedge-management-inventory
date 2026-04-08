import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import Link from './Link';

describe('Link', () => {
    test('Link renders correcly', () => {
        render(<Link href="https://google.com">Google</Link>);

        const aElement = screen.getByText('Google');
        expect(aElement).toBeInTheDocument();
    });

    test('Url has been correctly set', () => {
        render(<Link href="https://google.com">Google</Link>);

        const linkElement = screen.getByRole('link', { name: /google/i });
        expect(linkElement).toHaveAttribute('href', 'https://google.com');
    });
});
