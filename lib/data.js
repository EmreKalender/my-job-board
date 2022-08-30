import prisma from "./prisma"

export const getJobs = async (prisma)=>{
    const Jobs=await prisma.Job.findMany({
        where: {
            published: true,
        },
        orderBy: [{
            id:'desc',
        },],
        include: {author:true,},
    })
    return Jobs
}

export const getJob=async (prisma,id)=>{
    const job=await prisma.Job.findUnique({
        where: {
            id: parseInt(id),
        },
        include:{author: true,},
    })
    return job
}

export const getCompany=async(prisma,id)=>{
    const company=await prisma.User.findUnique({
        where:{
            id: id,
        },
    })
    return company
}

export const getCompanyJobs=async(prisma,company)=>{
    const jobs=await prisma.job.findMany({
        where: {
            authorId: company,
            published: true,
        },
        orderBy:[{
            id:'desc',
        },],
        include:{
            author: true,
        },
    })
    return jobs
}

export const getUser= async(prisma,id)=>{
    const user=await prisma.user.findUnique({
        where:{id,},
    })
    return user
}

export const getJobsPosted= async (prisma,user_id)=>{
    const jobs=await prisma.job.findMany({
        where:{authorId: user_id},
        orderBy:[{
            id:'desc',
        },],
        include:{
            author:true,
        },
    })
    return jobs
}