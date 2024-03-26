import customFetch from "../utils/customFetch";
import { type StatsResponseType } from "../../../controllers/jobController";
import { ChartsContainer, StatsContainer } from "../components";
import { QueryClient, useQuery } from "@tanstack/react-query";

const statsQuery = {
    queryKey: ["stats"],
    queryFn: async () => {
        const {data} = await customFetch.get("/jobs/stats")
        return data
    }
}

export const loader = (queryClient:QueryClient) => async () => {
    await queryClient.ensureQueryData(statsQuery)
    return null
};

function Stats() {
 
    const { data } = useQuery(statsQuery);

    const { defaultStats, monthlyApplications } = data as StatsResponseType

    return (
        <>
            <StatsContainer defaultStats={defaultStats} />
            {monthlyApplications?.length > 1 && (
                <ChartsContainer monthlyApplications={monthlyApplications} />
            )}
        </>
    );
}
export default Stats;
