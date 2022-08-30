import { getJobs, getUser } from "lib/data.js"
import Jobs from "components/Jobs"
import prisma from "lib/prisma"
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Home({jobs,user}) {
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
      {session && (
  <>
    <p className='mb-10 text-2xl font-normal'>
      Welcome, {user.name}
      {user.company && (
        <span className='bg-black text-white uppercase text-sm p-2'>
          Company
        </span>
      )}
    </p>
    {user.company ? (
      <>
        <Link href={'/new'}>
          <button
            className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '
          >
            click here to post a new job
          </button>
        </Link>
        <Link href={'/dashboard'}>
        <button
          className='ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '
        >
          see all the jobs you posted
        </button>
        </Link>
      </>
    ) : (
      <>
        <button
          className='ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '
        >
          see all the jobs you applied to
        </button>
      </>
    )}
  </>
)}
      <div className='text-center p-4 m-4'>
        <h2 className='mb-2 text-4xl font-bold'>Find a job!</h2>
      </div>
      <Jobs Jobs={jobs}/>
    </div>
  )
}

export async function getServerSideProps(context){
  const session=await getSession(context)
  let jobs=await getJobs(prisma)
  jobs=JSON.parse(JSON.stringify(jobs))
  if(!session){
        return {
          props:{
          jobs,
        },
      }
    }
  let user=await getUser(prisma,session.user.id)
  user=JSON.parse(JSON.stringify(user))
  return {
    props:{
      jobs,
      user,
    },
  }
}