import { UserType } from "../../../models/UserModel";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
    ActionFunctionArgs,
    Form,
    redirect,
    useOutletContext,
} from "react-router-dom";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../..//utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";

export const action = (queryClient:QueryClient) => async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post("/jobs", data);
        queryClient.invalidateQueries(['jobs'])
        toast.success("job created successfully ");
        return redirect("all-jobs");
    } catch (error) {
        toast.error((error as AxiosError).response?.data as string);
        return error;
    }
};

const AddJob = () => {
    const { user } = useOutletContext() as { user: UserType };
 
    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">add job</h4>
                <div className="form-center">
                    <FormRow type="text" name="position" />
                    <FormRow type="text" name="company" />
                    <FormRow
                        type="text"
                        labelText="job location"
                        name="jobLocation"
                        defaultValue={user.location}
                    />
                    <FormRowSelect
                        list={Object.values(JOB_STATUS)}
                        labelText="Job Status"
                        name="jobStatus"
                        defaultValue={JOB_STATUS.PENDING}
                    />
                    <FormRowSelect
                        list={Object.values(JOB_TYPE)}
                        labelText="Job Type"
                        name="jobType"
                    />
                  <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    );
};
export default AddJob;
