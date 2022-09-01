import prisma from "lib/prisma";
import { getSession } from "next-auth/react";
import { getUser } from "lib/data";

export default async function handler(req,res){
    if(req.method!=='POST') {
        return res.status(501).end()
    }
    const session=await getSession({req})
    if(!session) return res.status(401).json({message: "Not logged in"})
    const user=await prisma.user.findUnique({
        where:{id: session.user.id,},
    })
    if(!user) return res.status(401).json({message: 'Undefined user'})
    if(!req.body.coverLetter) return res.status(400).json({message: 'Required field cover letter missing'})
    if(!req.body.jobId) return res.status(400).json({message: 'Required field job id missing'})
    await prisma.application.create({
        data:{
            coverLetter: req.body.coverLetter,
            Job: {
                connect: {id: req.body.jobId},
            },
            author:{
                connect: {id: session.user.id},
            },
        },
    })
    res.status(200).end()
    return
}