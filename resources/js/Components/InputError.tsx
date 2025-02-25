import { HTMLAttributes } from "react";

export default function InputError({
    message,
    className = "",
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={
                "text-[0.8rem] font-medium text-destructive " + className
            }
        >
            {message}
        </p>
    ) : null;
}
