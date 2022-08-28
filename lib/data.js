
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