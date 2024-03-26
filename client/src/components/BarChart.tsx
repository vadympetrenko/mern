import { ChartsContainerType } from "./ChartsContainer"
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
  

const BarChart:React.FC<ChartsContainerType> = ({monthlyApplications}) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
        <RechartsBarChart data={monthlyApplications} margin={{top: 50}}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey='count' fill="#2cb1bc" barSize={75} />
        </RechartsBarChart>
    </ResponsiveContainer>
  )
}
export default BarChart