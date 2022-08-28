import { getJobs } from "lib/data.js"
import Jobs from "components/Jobs"
import prisma from "lib/prisma"

export default function Home({jobs}) {
  return (
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>
      
      <Jobs Jobs={jobs}/>
    </div>
  )
}

export async function getServerSideProps(context){
  let jobs=await getJobs(prisma)
  jobs=JSON.parse(JSON.stringify(jobs))
  return {
    props:{
      jobs,
    },
  }
}