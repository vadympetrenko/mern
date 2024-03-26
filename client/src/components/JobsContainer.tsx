import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { AllJobsDataType, useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
    const {
        data: { jobs, totalJobs, numOfPages },
    } = useAllJobsContext() as AllJobsDataType;

    if (!jobs.length) {
        return (
            <Wrapper>
                <h2>No Jobs to display...</h2>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className="jobs">
                {jobs.map((job) => (<Job key={job._id} {...job} /> ))}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    );
};
export default JobsContainer;
