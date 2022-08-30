import Link from 'next/link'

const Job = ({ job, isDashboard }) => {
  return (
    <div className='mb-4 mx-96 px-5 w-4/5 mt-20 pl-16 pr-16 border  border-spacing-2 rounded-3xl'>
      <Link href={`/job/${job.id}`}>
        <a className='text-xl font-bold font-serif underline'>{job.title}</a>
      </Link>
      <h2 className='text-base font-normal mt-3'>{job.description}</h2>
      <div className='mt-4'>
        <div className='mb-4'>
        {isDashboard && job.published &&(
          <span className='bg-black text-white uppercase text-sm p-2 mr-5'>
            ✅ published
          </span>
        )}
        {isDashboard && !job.published &&(
          <span className='bg-black text-white uppercase text-sm p-2 mr-5'>
            ❌ not published
          </span>
        )}
        </div>
        <h4 className='inline'>Posted by</h4>
        <div className='ml-3 -mt-6 inline'>
          <span>
            <p>
              <span className='text-base font-medium color-primary underline'>
                {job.author.name}
              </span>
            </p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Job