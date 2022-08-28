
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