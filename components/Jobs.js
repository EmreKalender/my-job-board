import Job from "components/Job";

const Jobs=({Jobs})=>{
    if(!Jobs) return null
    return(
        <>
            {
                Jobs.map((job,index)=>
                    (
                        <Job key={index} job={job}/>
                    )
                )
            }
        </>
    )
}

export default Jobs