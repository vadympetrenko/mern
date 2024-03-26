import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby thundercats copper mug biodiesel forage you probably
            haven't heard of them, af small batch. Forage godard JOMO, pinterest
            schlitz farm-to-table everyday carry direct trade. Listicle leggings
            raw denim cardigan franzen dreamcatcher tacos farm-to-table bodega
            boys woke PBR&B seitan selvage.
          </p>
          <Link to='/register' className="btn register-link">Register</Link>
          <Link to='/login' className="btn">Login / Demo User</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img"/>
      </div>
    </Wrapper>
  );
};

export default Landing;
