
import { signJwtAccessToken, signJwtRefreshToken } from '@/src/lib/jwt'
import prisma from '@/src/lib/prisma'
import * as bcrypt from 'bcrypt'

interface RequestBody {
    name: string
    email: string
    password: string
    role : string
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json()
 
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            role: body.role,
            password: await bcrypt.hash(body.password, 10),
        },
    })
    const {password, ...result} = user
    return new Response(JSON.stringify(result))
}
