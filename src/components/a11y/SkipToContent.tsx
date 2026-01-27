import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const SkipToContent = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Button
            variant="default"
            className={cn(
                'fixed top-4 left-4 z-[100] transform -translate-y-[200%] transition-transform duration-200 focus:translate-y-0',
                isFocused && 'translate-y-0'
            )}
            asChild
        >
            <a
                href="#main-content"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                Skip to content
            </a>
        </Button>
    );
};
