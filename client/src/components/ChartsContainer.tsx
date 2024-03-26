import { useState } from "react";
import { MonthlyApplicationsType } from "../../../controllers/jobController";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

export type ChartsContainerType = {
    monthlyApplications: MonthlyApplicationsType[];
};

const ChartsContainer: React.FC<ChartsContainerType> = ({monthlyApplications}) => {
    const [barChart, setBarChart] = useState<boolean>(true);

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button onClick={() => setBarChart(!barChart)}>
                {barChart ? "Area Chart" : "Bar Chart"}
            </button>
            {barChart ? <BarChart monthlyApplications={monthlyApplications} /> : <AreaChart monthlyApplications={monthlyApplications}/>}
        </Wrapper>
    );
};
export default ChartsContainer;
