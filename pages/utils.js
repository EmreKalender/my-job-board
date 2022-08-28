export default function Utils() {
  return (
    <div className='mt-10 ml-20'>
      <h2 className='mb-10 text-xl'>Utils</h2>
      <div className="flex-1 mb-5">
        <button
            className="border px-8 py-2 mt-5 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker"
            onClick={async ()=>{
                await fetch('/api/utils',{
                    body: JSON.stringify({
                        task: 'Clean_Database'
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                })
            }}
        >
            Clean Database
        </button>
      </div>
      <div className="flex-1 mb-5">
        <button
            className="border px-8 py-2 mt-5 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker"
            onClick={async ()=>{
                await fetch('/api/utils',{
                    body: JSON.stringify({
                        task: 'Generate_Users_and_Jobs'
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                })
            }}
        >    
            Generate Users and Jobs
        </button>
      </div>
            <div className="flex-1 mb-5">
        <button
            className="border px-8 py-2 mt-5 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker"
            onClick={async ()=>{
                await fetch('/api/utils',{
                    body: JSON.stringify({
                        task: 'Generate_One_Job'
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                })
            }}
        >
            Generate One Job
        </button>
      </div>
    </div>
  )
}