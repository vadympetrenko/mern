import { Form, Link, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from ".";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { AllJobsDataType, useAllJobsContext } from "../pages/AllJobs";

const SearchContainer: React.FC = () => {
    const {
        searchValues: { search, jobType, jobStatus, sort },
    } = useAllJobsContext() as AllJobsDataType;
    const submit = useSubmit();

    const debounce = (onChange: (form: HTMLFormElement) => void) => {
        let timeout: NodeJS.Timeout;
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const from = event.currentTarget.form;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                onChange(from!);
            }, 2000);
        };
    };

    return (
        <Wrapper>
            <Form className="form">
                <h5 className="form-title">search form</h5>
                <div className="form-center">
                    <FormRow
                        type="search"
                        name="search"
                        defaultValue={search}
                        onChange={debounce((form) => {
                            submit(form);
                        })}
                    />
                    <FormRowSelect
                        list={["all", ...Object.values(JOB_STATUS)]}
                        labelText="job status"
                        name="jobStatus"
                        defaultValue={jobStatus}
                        onChange={(event) => submit(event.currentTarget.form)}
                    />
                    <FormRowSelect
                        list={["all", ...Object.values(JOB_TYPE)]}
                        labelText="job type"
                        name="jobType"
                        defaultValue={jobType}
                        onChange={(event) => submit(event.currentTarget.form)}
                    />
                    <FormRowSelect
                        name="sort"
                        defaultValue={sort}
                        list={[...Object.values(JOB_SORT_BY)]}
                        onChange={(event) => submit(event.currentTarget.form)}
                    />

                    <Link
                        to="/dashboard/all-jobs"
                        className="btn form-btn delete-btn"
                    >
                        Reset search values
                    </Link>
                </div>
            </Form>
        </Wrapper>
    );
};
export default SearchContainer;
