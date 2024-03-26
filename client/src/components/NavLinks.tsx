import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar }: { isBigSidebar?: boolean }) => {
    const { toggleSidebar, user } = useDashboardContext();
    const { role } = user;

    return (
        <div className="nav-links">
            {links.map((link) => {
                if (link.path === "admin" && role !== "admin") return;

                return (
                    <NavLink
                        to={link.path}
                        key={link.path}
                        className="nav-link"
                        onClick={isBigSidebar ? () => {} : toggleSidebar}
                        end
                    >
                        <span className="icon">{link.icon}</span>
                        {link.text}
                    </NavLink>
                );
            })}
        </div>
    );
};
export default NavLinks;
