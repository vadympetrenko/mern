import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import { StatsReducerType } from "../../../controllers/jobController";
import Wrapper from "../assets/wrappers/StatsContainer";
import { StatItem } from ".";

type StatsContainerType = {
    defaultStats: StatsReducerType;
};

const StatsContainer: React.FC<StatsContainerType> = ({ defaultStats }) => {
    const stats = [
        {
            title: "pending applications",
            count: defaultStats?.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: "#f59e0b",
            bgc: "#f3f3c7",
        },
        {
            title: "interview scheduled",
            count: defaultStats?.interview || 0,
            icon: <FaCalendarCheck />,
            color: "#647ACB",
            bgc: "#e0e8f9",
        },
        {
            title: "jobs declined",
            count: defaultStats?.declined || 0,
            icon: <FaBug />,
            color: "#d66a6a",
            bgc: "#ffeeee",
        },
    ];
    return <Wrapper>{stats.map((item) => <StatItem key={item.title} count={item.count} title={item.title} icon={item.icon} color={item.color} bcg={item.bgc} />)}</Wrapper>;
};
export default StatsContainer;
