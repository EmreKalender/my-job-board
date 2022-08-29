import { getJobs } from "lib/data.js"
import Jobs from "components/Jobs"
import prisma from "lib/prisma"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Home({jobs}) {
  const {data: session, status}=useSession()
  const router=useRouter()
  if(session && !session.user.name) {
    router.push('/setup')
    return
  }
  return (
    <div className='mt-0 pt-5 bg-black text-white'>
      <div className="text-center mt-5">
        {!session && (
          <a className="border px-8 py-2 mt-5 font-bold rounded-full bg-white text-black border-black" 
          href='/api/auth/signin'>
            login
          </a>
        )}
      </div>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-2 text-4xl font-bold'>Find a job!</h2>
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