import { ChartsContainerType } from "./ChartsContainer";
import {
    ResponsiveContainer,
    AreaChart as RechartsAreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
} from "recharts";

const AreaChart: React.FC<ChartsContainerType> = ({ monthlyApplications }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart data={monthlyApplications} margin={{ top: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#2cb1bc"
                    fill="#bef8fd"
                />
            </RechartsAreaChart>
        </ResponsiveContainer>
    );
};
export default AreaChart;
