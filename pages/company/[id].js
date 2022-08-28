import prisma from "lib/prisma"
import { getCompany,getCompanyJobs } from "lib/data"
import Jobs from 'components/Jobs'
import Link from 'next/link'
import Job from "components/Job"

export default function Company({jobs,company}){
    console.log(company)
    return(
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <Link href={`/`}>
          <a href='' className='mb-10 text-sm font-bold underline'>
            back
          </a>
        </Link>
      </div>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Profile of {company.name}</h2>
      </div>

      <div className='mb-4 mt-20'>
        <div className='pl-16 pr-16 -mt-6'>
          <p className='text-center text-xl font-bold'>Company jobs</p>
          <Jobs Jobs={jobs}/>
        </div>
      </div>
    </div>
   ) 
}

export async function getServerSideProps(context){
  let company=await getCompany(prisma,context.params.id)
  let jobs=await getCompanyJobs(prisma,company.id)
  company=JSON.parse(JSON.stringify(company))
  jobs=JSON.parse(JSON.stringify(jobs))
  return {
    props:{
      jobs,
      company,
    },
  }
}