"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

/**
 * Renders a Toaster component that displays toast notifications.
 * @returns {JSX.Element} A ToastProvider component containing Toast elements for each toast notification.
 */
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      /**
       * Renders a list of Toast components based on the provided toasts array
       * @param {Array} toasts - An array of toast objects containing id, title, description, action, and other props
       * @returns {Array} An array of React elements representing individual Toast components
       */
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
