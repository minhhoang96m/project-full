import jwt, { JwtPayload } from "jsonwebtoken"

interface SignOption {
    expiresIn : string | number
}
const DEFAULT_SIGN_OPTION:SignOption = { expiresIn: "1h"}
const DEFAULT_SIGN_OPTION_FRESH:SignOption = { expiresIn: "1d"}

export const signJwtAccessToken = (payload: JwtPayload, options : SignOption = DEFAULT_SIGN_OPTION)  => {
    const secret_key = process.env.SECRET_KEY
    const token = jwt.sign(payload, secret_key!, options)
    return token
}   
export const signJwtRefreshToken = (payload: JwtPayload, options : SignOption = DEFAULT_SIGN_OPTION_FRESH)  => {
    const secret_key_refresh = process.env.SECRET_KEY_REFRESH
    const tokenFresh = jwt.sign(payload, secret_key_refresh!, options)
    return tokenFresh
}   

export const verifyJwtAccessToken = (token: string) => {
    try {
        const secret_key = process.env.SECRET_KEY
        const decoded = jwt.verify(token, secret_key!)
        return decoded as JwtPayload
    } catch (error) {
        console.log(error)
        return null
    }
}

export const verifyJwtFreshToken = (tokenFresh: string) => {
    try {
        const secret_key_refresh = process.env.SECRET_KEY_REFRESH
        const decodedFresh = jwt.verify(tokenFresh, secret_key_refresh!)
        return decodedFresh as JwtPayload
    } catch (error) {
        console.log(error)
        return null
    }
}