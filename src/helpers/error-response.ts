/**
 * @description Ensures consistency in error response returned
 */
class ApplicationError extends Error {
    status: number
    message: string
    errors: object
    constructor(
        status = 500,
        message = 'Sorry, an error occurred',
        errors = {}
    ) {
        super()
        this.status = status
        this.message = message
        this.errors = errors
    }
}

export default ApplicationError
