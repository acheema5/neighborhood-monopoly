import { useNavigate } from "react-router-dom";
import { businesses } from "../data/businesses";
import { neighborhood } from "../data/neighborhood";
import { playerSeed } from "../data/player";
import { useAppStore } from "../store/useAppStore";
import { ProgressBar } from "../components/ProgressBar";
import { ChevronRightIcon, UserIcon } from "../components/icons";

export function ProfilePage() {
  const navigate = useNavigate();
  const collectedBusinessIds = useAppStore((s) => s.collectedBusinessIds);
  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const earnedBadgeIds = useAppStore((s) => s.earnedBadgeIds);
  const resetDemo = useAppStore((s) => s.resetDemo);

  return (
    <div className="profile-page">
      <div className="profile-page__identity">
        <span className="profile-page__avatar">
          <UserIcon />
        </span>
        <div>
          <h1>{playerSeed.name}</h1>
          <p>Level {playerSeed.level} Explorer · {playerSeed.streakDays} day streak</p>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-row__item">
          <strong>{collectedBusinessIds.length}</strong>
          <span>Properties</span>
        </div>
        <div className="stat-row__item">
          <strong>{pointsBalance}</strong>
          <span>Points</span>
        </div>
        <div className="stat-row__item">
          <strong>{earnedBadgeIds.length}</strong>
          <span>Badges</span>
        </div>
      </div>

      <h2>My {neighborhood.name}</h2>
      <p>
        {collectedBusinessIds.length} / {businesses.length} properties collected
      </p>
      <ProgressBar value={collectedBusinessIds.length} max={businesses.length} />

      <ul className="settings-list">
        <li>
          <button type="button" onClick={() => navigate("/collection")}>
            <span>Collection History</span>
            <ChevronRightIcon />
          </button>
        </li>
        <li>
          <button type="button" onClick={() => navigate("/collection?tab=rewards")}>
            <span>My Rewards</span>
            <ChevronRightIcon />
          </button>
        </li>
      </ul>

      <h2>Settings</h2>
      <ul className="settings-list">
        <li>
          <button type="button" onClick={resetDemo}>
            <span>Reset Demo</span>
            <ChevronRightIcon />
          </button>
        </li>
      </ul>

      <h2>About this demo</h2>
      <p className="demo-disclaimer">{neighborhood.disclaimer}</p>
    </div>
  );
}
