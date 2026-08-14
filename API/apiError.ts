export class APIError extends Error {
    status?: number
    statusText?: string

    constructor(message: string, response?: Response) {
        super(message)
        this.name = "APIError"
        this.status = response?.status
        this.statusText = response?.statusText
    }
}

