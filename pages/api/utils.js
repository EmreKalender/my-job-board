import prisma from "lib/prisma"
import {faker} from '@faker-js/faker'

const generateFakeJob=(user)=>({
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraphs(),
    author: {
        connect: {id: user.id},
    },
})

const generateFakeUser=()=>({
    name: faker.internet.userName().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    company: faker.datatype.boolean(),
})

export default async function handler(req,res){
    if(req.method!=='POST') return res.end()
    if(req.body.task==='Clean_Database'){
        await prisma.job.deleteMany({})
        await prisma.user.deleteMany({})
    }
    
    if(req.body.task==='Generate_Users_and_Jobs'){
        let count=0
        while(count<10){
            await prisma.user.create({
                data: generateFakeUser(),
            })
            count++
        }
        const users=await prisma.user.findMany({
            where:{
                company: true,
            },
        })
        users.forEach(async (user)=>{
            await prisma.job.create({
                data: generateFakeJob(user),
            })
        })
    }
    
    if(req.body.task==='Generate_One_Job'){
        const users=await prisma.user.findMany({
            where:{
                company: true,
            },
        })
        const num_users=users.length;
        const randomUserId=Math.floor(Math.random()*num_users)
        await prisma.job.create({
            data: generateFakeJob(users[randomUserId]),
        })
    }

    res.end()
}