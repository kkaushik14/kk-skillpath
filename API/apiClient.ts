import { APIError } from "./apiError"

export async function fetchJson<T>(
    url: string,
    errorMessage: string,
    signal?: AbortSignal
): Promise<T> {
    const response = await fetch(url, { signal })

    if (!response.ok) {
        throw new APIError(errorMessage, response)
    }

    return response.json()
}
