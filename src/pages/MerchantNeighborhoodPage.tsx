import { useNavigate } from "react-router-dom";
import { NeighborhoodPicker } from "../components/NeighborhoodPicker";

export function MerchantNeighborhoodPage() {
  const navigate = useNavigate();

  return (
    <div className="merchant-page">
      <h1>Select a neighborhood</h1>
      <p>Choose where your business is located to get started.</p>
      <NeighborhoodPicker onSelect={() => navigate("/merchant/claim")} />
    </div>
  );
}
