import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 p-0 hover:scale-110 transition-smooth",
        "border-border/50 hover:border-primary/50",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <span className="text-lg">☀️</span>
      ) : (
        <span className="text-lg">🌙</span>
      )}
    </Button>
  );
};