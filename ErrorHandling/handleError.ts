import type { AppError } from "../Types/main"

export function handleError(message: string, error: unknown): AppError {
    console.error(message, error)

    return {
        message,
        error,
    }
}
