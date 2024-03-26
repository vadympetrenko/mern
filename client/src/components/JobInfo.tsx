import { ReactNode } from "react";
import Wrapper from "../assets/wrappers/JobInfo";

type JobInfoType = {
    icon: ReactNode;
    text: string;
};

const JobInfo: React.FC<JobInfoType> = ({ text, icon }) => {
    return (
        <Wrapper>
            <span className="job-icon">{icon}</span>
            <span className="job-text">{text}</span>
        </Wrapper>
    );
};
export default JobInfo;
