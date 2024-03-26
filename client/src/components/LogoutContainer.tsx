import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();
    return (
        <Wrapper>
            <button
                className="btn logout-btn"
                onClick={() => setShowLogout(!showLogout)}
            >
                {user.avatar ? (
                    <img src={user.avatar} alt="avatar" className="img" />
                ) : (
                    <FaUserCircle />
                )}

                {user?.name}
                <FaCaretDown />
            </button>
            <div className={`dropdown ${showLogout ? "show-dropdown" : ""} `}>
                <button className="dropdown-btn" onClick={logoutUser}>
                    logout
                </button>
            </div>
        </Wrapper>
    );
};
export default LogoutContainer;
