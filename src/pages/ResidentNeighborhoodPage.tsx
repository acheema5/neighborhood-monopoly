import { Link, useNavigate } from "react-router-dom";
import { NeighborhoodPicker } from "../components/NeighborhoodPicker";
import { ArrowLeftIcon } from "../components/icons";

export function ResidentNeighborhoodPage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-page__card home-page__card--left">
        <Link to="/" className="merchant-dashboard__switch">
          <ArrowLeftIcon /> Back
        </Link>

        <h1>Select a neighborhood</h1>
        <p>Choose where you'd like to explore.</p>
        <NeighborhoodPicker onSelect={() => navigate("/app")} />
      </div>
    </div>
  );
}
