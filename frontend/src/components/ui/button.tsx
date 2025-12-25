import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded text-sm font-medium",
                    {
                        "bg-primary text-primary-foreground hover:opacity-90":
                            variant === "default",
                        "bg-destructive text-destructive-foreground hover:opacity-90":
                            variant === "destructive",
                        "border border-input hover:bg-accent": variant === "outline",
                        "bg-secondary text-secondary-foreground hover:opacity-80":
                            variant === "secondary",
                        "hover:bg-accent": variant === "ghost",
                        "text-primary underline-offset-4 hover:underline": variant === "link",
                    },
                    {
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded px-3": size === "sm",
                        "h-11 rounded px-8": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button };
