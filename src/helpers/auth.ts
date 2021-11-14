import jsonwebtoken from 'jsonwebtoken'
import { config } from 'dotenv'
import bcrypt from 'bcrypt'

config()

/**
 * @description generates access token for users
 * @param {Object} param0
 * @param {Object} param0.id user Id
 * @param {Object} param0.email email of user
 * @returns
 */
export const generateJWT = async ({ id, email }) => {
    return jsonwebtoken.sign(
        {
            id,
            email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    )
}

const SALT_ROUNDS = 10

/**
 * @description hashes password from plain text
 * @param password plain password to be encrypted
 * @returns {String}
 */
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    return await bcrypt.hash(password, salt)
}

/**
 * @description checks if password matches what was already saved
 * @param {String} inputPassword Plain password
 * @param {String} hashedPassword hashed password
 * @async
 * @returns {Boolean}
 */
export const checkPasswordMatch = async function (
    inputPassword: string,
    hashedPassword: string
) {
    return await bcrypt.compare(inputPassword, hashedPassword)
}
