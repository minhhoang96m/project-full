
import * as bcrypt from 'bcrypt'

import prisma from '@/src/lib/prisma'
import { signJwtAccessToken, signJwtRefreshToken } from '@/src/lib/jwt'
interface RequestBody {
    username: string
    password: string 
}

export const POST = async (request: Request) => {
    const body: RequestBody = await request.json()

    const user = await prisma.user.findFirst({
        where: {
            email: body.username,
        },
    })
    if (user && (await bcrypt.compare(body.password, user.password as string))) {
        const {password, ...userWithoutPass} = user
        const access_token = signJwtAccessToken(userWithoutPass)
        const refresh_token = signJwtRefreshToken(userWithoutPass)
        await prisma.user.create({
            data: {refresh_token:refresh_token}
        })
        const result = {
            ...userWithoutPass,
            access_token,
            refresh_token
        }
        return new Response(JSON.stringify(result))

    } else return new Response(JSON.stringify(null))
}
