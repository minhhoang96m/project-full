import prisma from "@/src/lib/prisma"

interface param {
    id : string
}
export async function GET( request: Request, { params }: {params: param}) {
    const userPots = await prisma.user.findUnique({
        where: { id : params.id },
    })
    if (userPots) {
        return new Response(JSON.stringify(userPots))
    } else return new Response(JSON.stringify(null))
    
}
