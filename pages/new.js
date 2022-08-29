import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter} from "next/router";
export default function New(){
    const [description,setDescription]=useState('')
    const [title,setTitle]=useState('')
    const [salary,setSalary]=useState('')
    const [location,setLocation]=useState('')
    const {data:session, status}=useSession()
    const router=useRouter()

    if(!session || !session.user) return null
    
    return(
        <form
            onSubmit={async (e)=>{
                e.preventDefault()
                await fetch('/api/job',{
                    body: JSON.stringify({
                        title,
                        description,
                        location,
                        salary,
                    }),
                    headers: {'Content-Type':'application/json'},
                    method: 'POST',
                })
                router.push('/dashboard')
                return
            }}
        >
            <div className="flex flex-col w-1/2 mx-auto">
                <h2 className="mt-10 mb-10 text-4xl font-bold">Post a new job!</h2>
                <div className="pt-2 mt-2 mr-1">
                    <input
                        className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
                        placeholder="Job title"
                        required
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                </div>
                <div className="pt-2 mt-2 mr-1">
                    <input
                        className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
                        placeholder="Job Description"
                        rows={2}
                        cols={50}
                        required
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </div>
                <div className="pt-2 mt-2 mr-1">
                    <input
                        className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
                        placeholder="Salary"
                        required
                        onChange={(e)=>setSalary(e.target.value)}
                    />
                </div>
                <div className="pt-2 mt-2 mr-1">
                    <input
                        className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
                        placeholder="Location"
                        required
                        onChange={(e)=>setLocation(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <button className="border float-left px-8 py-2 mt-0 font-bold rounded-full bg-black text-white">
                        Post Job
                    </button>
                </div>
            </div>
        </form>
    )

}