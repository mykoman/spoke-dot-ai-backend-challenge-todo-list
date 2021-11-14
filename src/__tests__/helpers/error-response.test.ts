import ApplicationError from '../../helpers/error-response'

describe('test the response and behaviour of response error', () => {
    it('should return 500 error by default', () => {
        const appError = new ApplicationError()
        expect(appError.status).toBe(500)
    })

    it('should return  message of Sorry, an error occurred when message is not passed', () => {
        const appError = new ApplicationError()
        expect(appError.message).toBe('Sorry, an error occurred')
    })

    it('should return empty error object by default', () => {
        const appError = new ApplicationError()
        const objectToMatch = {
            errors: {},
            status: 500,
            message: 'Sorry, an error occurred',
        }
        expect(appError).toMatchObject(objectToMatch)
    })

    it('should return exact paramters passed', () => {
        const status = 400
        const message = 'Bad request'
        const errors = { erros: [] }
        const appError = new ApplicationError(status, message, errors)
        const objectToMatch = {
            errors,
            status,
            message,
        }
        expect(appError).toMatchObject(objectToMatch)
    })
})
