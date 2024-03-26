import { NavLinks } from ".";
import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo } from ".";
import { useDashboardContext } from "../pages/DashboardLayout";
const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${!showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
