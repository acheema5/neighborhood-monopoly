import { useNavigate } from "react-router-dom";
import { businesses } from "../data/businesses";
import { neighborhood } from "../data/neighborhood";
import { useAppStore } from "../store/useAppStore";

export function ProfilePage() {
  const navigate = useNavigate();
  const collectedBusinessIds = useAppStore((s) => s.collectedBusinessIds);
  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const earnedBadgeIds = useAppStore((s) => s.earnedBadgeIds);
  const resetDemo = useAppStore((s) => s.resetDemo);

  return (
    <div className="profile-page">
      <h1>Demo Explorer</h1>
      <p>Local Explorer</p>

      <h2>My {neighborhood.name}</h2>
      <p>
        {collectedBusinessIds.length} / {businesses.length} properties collected
      </p>
      <p>{pointsBalance} points earned</p>
      <p>{earnedBadgeIds.length} badges unlocked</p>

      <button type="button" onClick={() => navigate("/collection")}>
        Collection History
      </button>
      <button type="button" onClick={() => navigate("/rewards")}>
        Rewards
      </button>

      <h2>Settings</h2>
      <button type="button" onClick={resetDemo}>
        Reset Demo
      </button>
    </div>
  );
}
