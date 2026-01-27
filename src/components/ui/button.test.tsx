import { render, screen } from '@testing-library/react';
import { Button } from './button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
    it('renders correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders as a link when using asChild', () => {
        render(
            <Button asChild>
                <a href="/test">Link Button</a>
            </Button>
        );
        expect(screen.getByRole('link', { name: /link button/i })).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
    });
});
