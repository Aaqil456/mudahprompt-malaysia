import * as React from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "./textarea"

export interface AutoResizeTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
    ({ className, onChange, ...props }, ref) => {
        const internalRef = React.useRef<HTMLTextAreaElement | null>(null)

        // Combine refs
        React.useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement)

        const adjustHeight = React.useCallback(() => {
            const textarea = internalRef.current
            if (textarea) {
                textarea.style.height = "auto"
                textarea.style.height = `${textarea.scrollHeight}px`
            }
        }, [])

        React.useEffect(() => {
            adjustHeight()
            // Also adjust on window resize
            window.addEventListener('resize', adjustHeight)
            return () => window.removeEventListener('resize', adjustHeight)
        }, [adjustHeight, props.value])

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            adjustHeight()
            if (onChange) {
                onChange(e)
            }
        }

        return (
            <Textarea
                {...props}
                ref={internalRef}
                onChange={handleChange}
                className={cn(
                    "min-h-[40px] max-h-[300px] resize-none overflow-y-auto transition-[height] duration-200",
                    className
                )}
            />
        )
    }
)
AutoResizeTextarea.displayName = "AutoResizeTextarea"

export { AutoResizeTextarea }
