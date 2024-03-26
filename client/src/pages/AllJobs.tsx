import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { JobsContainer, SearchContainer } from "../components";
import { JobType } from "../../../models/JobModel";
import { createContext, useContext } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type AllJobsDataType = {
    data: {
        jobs: JobType[];
        totalJobs: number;
        numOfPages: number;
        currentPage: number;
    };
    searchValues: ParamsType;
};

type ParamsType = { [k: string]: string };

const allJobsQuery = (params: ParamsType) => {
    const { serch, jobStatus, jobType, sort, page } = params;
    return {
        queryKey: [
            "jobs",
            serch ?? "",
            jobStatus ?? "all",
            jobType ?? "all",
            sort ?? "newest",
            page ?? 1,
        ],
        queryFn: async () => {
            const { data } = await customFetch.get("/jobs", { params });
            return data;
        },
    };
};

const AllJobsContext = createContext<AllJobsDataType | undefined>(undefined);

export const loader =
    (queryClient: QueryClient) =>
    async ({ request }: LoaderFunctionArgs) => {
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);
        await queryClient.ensureQueryData(allJobsQuery(params));
        return { searchValues: { ...params } };
    };

const AllJobs = () => {
    const { searchValues } = useLoaderData() as AllJobsDataType;
    const { data } = useQuery(allJobsQuery(searchValues));

    return (
        <>
            <AllJobsContext.Provider value={{ data, searchValues }}>
                <SearchContainer />
                <JobsContainer />
            </AllJobsContext.Provider>
        </>
    );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
