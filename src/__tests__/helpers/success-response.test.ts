import { SuccessResponse } from '../../helpers/success-response'

describe('test success response class', () => {
    it('should return status of success when nothing is passed as status', () => {
        const message = 'Created'
        const response = new SuccessResponse({ message })
        expect(response.message).toBe(message)
    })

    it('should match object when all required arguments are passed as argument', () => {
        const message = 'Created'
        const status = 'Done'
        const data = {
            todos: [],
        }
        const expectedOutput = {
            message,
            status,
            data,
        }
        const response = new SuccessResponse({ message, status, data })
        expect(response).toMatchObject(expectedOutput)
    })

    it('should match empty data when data is not passed as argument', () => {
        const message = 'Created'
        const expectedOutput = {
            message,
        }
        const response = new SuccessResponse({ message })
        expect(response).toMatchObject(expectedOutput)
    })
})
