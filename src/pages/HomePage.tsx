import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "../components/icons";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page home-page--landing">
      <div className="home-page__card">
        <span className="home-page__kicker">No. 01 — Local Discovery</span>
        <h1>
          Neighborhood
          <br />
          Monopoly
        </h1>
        <p>Discover local businesses, collect them as properties, and earn rewards.</p>

        <div className="home-page__options">
          <button type="button" className="home-page__option" onClick={() => navigate("/resident")}>
            <span className="home-page__option-index">01</span>
            <span className="home-page__option-body">
              <strong>I'm a resident</strong>
              <span>Explore the neighborhood and collect properties</span>
            </span>
            <ChevronRightIcon className="home-page__option-arrow" />
          </button>

          <button type="button" className="home-page__option" onClick={() => navigate("/merchant")}>
            <span className="home-page__option-index">02</span>
            <span className="home-page__option-body">
              <strong>I'm a merchant</strong>
              <span>Manage your listing, offers, and redemptions</span>
            </span>
            <ChevronRightIcon className="home-page__option-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
