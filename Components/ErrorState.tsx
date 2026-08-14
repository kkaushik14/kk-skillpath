import * as React from "react"

type ErrorStateProps = {
    message: string
    onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div
            style={{
                padding: 40,
                textAlign: "center",
            }}
        >
            <p>{message}</p>

            <button
                onClick={onRetry}
                style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Retry
            </button>
        </div>
    )
}
