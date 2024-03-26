import {
    ActionFunctionArgs,
    Form,
    LoaderFunctionArgs,
    redirect,
    useLoaderData,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { QueryClient, useQuery } from "@tanstack/react-query";

export const action =
    (queryClient: QueryClient) =>
    async ({ request, params }: ActionFunctionArgs) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        try {
            await customFetch.patch(`/jobs/${params.id}`, data);
            queryClient.invalidateQueries(["jobs"]);
            toast.success("job updated successfully");
            return redirect("/dashboard/all-jobs");
        } catch (error) {
            toast.error((error as AxiosError).response?.data as string);
            return error;
        }
    };

const editQuery = (id: string) => {
    return {
        queryKey: ["edit", id],
        queryFn: async () => {
            const response = await customFetch.get(`/jobs/${id}`);
            return response.data;
        },
    };
};

export const loader =
    (queryClient: QueryClient) =>
    async ({ params }: LoaderFunctionArgs) => {
        try {
            await queryClient.ensureQueryData(editQuery(params.id!));
            return params;
        } catch (error) {
            toast.error((error as AxiosError).response?.data as string);
            return redirect("/dashboard/all-jobs");
        }
    };

const EditJob = () => {
    const { id } = useLoaderData() as { id: string };
    const { data: job } = useQuery(editQuery(id));

    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">Edit job</h4>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="position"
                        defaultValue={job.position}
                    />
                    <FormRow
                        type="text"
                        name="company"
                        defaultValue={job.company}
                    />
                    <FormRow
                        type="text"
                        name="jobLocation"
                        labelText="job location"
                        defaultValue={job.jobLocation}
                    />
                    <FormRowSelect
                        list={Object.values(JOB_STATUS)}
                        labelText="Job Status"
                        name="jobStatus"
                        defaultValue={job.jobStatus}
                    />
                    <FormRowSelect
                        list={Object.values(JOB_TYPE)}
                        labelText="Job Type"
                        name="jobType"
                        defaultValue={job.jobType}
                    />
                    <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    );
};
export default EditJob;
