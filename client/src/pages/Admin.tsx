import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { redirect, useLoaderData } from "react-router-dom"
import Wrapper from "../assets/wrappers/StatsContainer"
import { StatItem } from "../components"
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa"

export const loader = async () => {
  try {
    const {data} = await customFetch.get('/users/admin/app-stats')
    console.log(data, 'dadada')
    return data
  } catch (error) {
    toast.error(`You are not authorized to view this page`)
    return redirect('/dashboard')
  }
}

type AdminStatsType = {
    users: number,
    jobs: number
}

const Admin = () => {
  const {users, jobs} = useLoaderData() as AdminStatsType

  return (
    <Wrapper>
      <StatItem title="current users" count={users} color="#e9b949" bcg="#fcefc7" icon={<FaSuitcaseRolling />}/>
      <StatItem title="total jobs" count={jobs} color="#647acb" bcg="#e0e8f9" icon={<FaCalendarCheck />}/>
    </Wrapper>
  )
}
export default Admin