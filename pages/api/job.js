import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req,res){

    if(req.method!='POST') return res.status(501).end()
    const session=await getSession({req})
    if(!session) return res.status(401).json({message: 'Not logged in'})
    const user=await prisma.user.findUnique({
        where:{
            id: session.user.id,
        },
    })
    if(!user) return res.status(401).json({message: 'User not found'})

    if(req.method==='POST'){
        if(!req.body.title) return res.status(400).json({message:'required field title not found'})
        if(!req.body.description) return res.status(400).json({message:'required field description not found'})
        if(!req.body.salary) return res.status(400).json({message:'required field salary not found'})
        if(!req.body.location) return res.status(400).json({message:'required field location not found'})
        await prisma.job.create({
            data:{
                title: req.body.title,
                description: req.body.description,
                salary: req.body.salary,
                location: req.body.location,
                author:{
                    connect: {id:user.id},
                },
            },
        })
        res.status(200).end()   
    }

}