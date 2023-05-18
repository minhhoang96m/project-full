import prisma from "@/src/lib/prisma"

export const GET = async  (request : Request, {params} : {params: {id:string}}) => {

    const user = await prisma.user.findFirst({
        where: {id : params.id}
    })
    if (user) {
        return new Response(JSON.stringify(user))
    }
    else new Response(JSON.stringify(null))
}