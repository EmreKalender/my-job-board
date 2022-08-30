import Job from "components/Job.js";

const Jobs=({Jobs, isDashboard})=>{
    if(!Jobs) return null
    return(
        <div className="m-5 p-5">
            {
                Jobs.map((job,index)=>
                    (
                        <Job key={index} job={job} isDashboard={isDashboard}/>
                    )
                )
            }
        </div>
    )
}

export default Jobs