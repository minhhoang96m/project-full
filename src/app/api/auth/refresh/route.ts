import prisma from '@/src/lib/prisma'
import {signJwtRefreshToken, verifyJwtFreshToken} from '@/src/lib/jwt'

interface RequestBody {
    refresh_token: string
}

export const POST = async (request: Request, response: Response) => {
    const body: RequestBody = await request.json()

    const isRefreshToken = verifyJwtFreshToken(body.refresh_token)
    if (isRefreshToken) {
        const user = await prisma.user.findFirst({
            where: {
                refresh_token: body.refresh_token,
            },
        })
        if (user) {
            const {password, ...userWithoutPass} = user
            const access_token = signJwtRefreshToken(userWithoutPass)
            const result = {
                ...userWithoutPass,
                access_token,
            }
            return new Response(JSON.stringify(result))
        }
    }
    //  else return new Response(JSON.stringify({
    //         status: 401,
    //         error: true
    //     }))
    else return response.status
}
