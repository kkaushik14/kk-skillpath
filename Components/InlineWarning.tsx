import * as React from "react"

type InlineWarningProps = {
    message: string
}

export function InlineWarning({ message }: InlineWarningProps) {
    return (
        <div
            style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: 8,
                background: "#FFF7ED",
                color: "#9A3412",
                fontSize: 14,
                boxSizing: "border-box",
            }}
        >
            {message}
        </div>
    )
}

