import { ActionFunctionArgs, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";

export const action = (queryClient:QueryClient) =>  async ({ params }: ActionFunctionArgs) => {
    try {
        await customFetch.delete(`/jobs/${params.id}`);
         queryClient.invalidateQueries(['jobs'])
        toast.success("Job deleted successfull");
    } catch (error) {
        toast.error((error as AxiosError).response?.data as string);
    }
    return redirect("/dashboard/all-jobs");
};
