import type { ReactNode } from "react"


type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <p className="bg-red-500 p-2 text-center text-white text-sm font-bold uppercase">
        {children}
    </p>
  )
}
