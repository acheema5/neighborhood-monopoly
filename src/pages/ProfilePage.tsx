import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { businesses } from "../data/businesses";
import { neighborhood } from "../data/neighborhood";
import { playerSeed } from "../data/player";
import { useAppStore } from "../store/useAppStore";
import { ProgressBar } from "../components/ProgressBar";
import { ConfirmModal } from "../components/ConfirmModal";
import { ChevronRightIcon, UserIcon, StorefrontIcon, CheckIcon } from "../components/icons";

export function ProfilePage() {
  const navigate = useNavigate();
  const collectedBusinessIds = useAppStore((s) => s.collectedBusinessIds);
  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const earnedBadgeIds = useAppStore((s) => s.earnedBadgeIds);
  const visitLog = useAppStore((s) => s.visitLog);
  const redeemedRewardBusinessIds = useAppStore((s) => s.redeemedRewardBusinessIds);
  const pilotFeedback = useAppStore((s) => s.pilotFeedback);
  const setPilotFeedback = useAppStore((s) => s.setPilotFeedback);
  const resetDemo = useAppStore((s) => s.resetDemo);

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const recentVisits = [...visitLog]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 4)
    .map((v) => businesses.find((b) => b.id === v.businessId))
    .filter((b): b is (typeof businesses)[number] => !!b);

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
          <button type="button" onClick={() => navigate("/app/collection")}>
            <span>Collection history</span>
            <ChevronRightIcon />
          </button>
        </li>
        <li>
          <button type="button" onClick={() => navigate("/app/collection?tab=rewards")}>
            <span>My rewards</span>
            <ChevronRightIcon />
          </button>
        </li>
      </ul>

      <h2>Recent activity</h2>
      {recentVisits.length === 0 ? (
        <p className="profile-page__empty">No check-ins yet — collect a property to get started.</p>
      ) : (
        <ul className="activity-list">
          {recentVisits.map((business) => (
            <li key={business.id} className="activity-list__item">
              <span className="activity-list__icon">
                <CheckIcon />
              </span>
              <span>Checked in at {business.name}</span>
            </li>
          ))}
        </ul>
      )}

      <h2>Reward history</h2>
      {redeemedRewardBusinessIds.length === 0 ? (
        <p className="profile-page__empty">No rewards redeemed yet.</p>
      ) : (
        <ul className="activity-list">
          {redeemedRewardBusinessIds.map((id) => {
            const business = businesses.find((b) => b.id === id);
            if (!business) return null;
            return (
              <li key={id} className="activity-list__item">
                <span className="activity-list__icon">
                  <CheckIcon />
                </span>
                <span>Redeemed {business.reward.title} at {business.name}</span>
              </li>
            );
          })}
        </ul>
      )}

      <h2>Pilot feedback</h2>
      <div className="pilot-feedback">
        <div className="pilot-feedback__row">
          <span>Did this app help you discover a place you hadn't visited before?</span>
          <div className="pilot-feedback__buttons">
            <button
              type="button"
              className={pilotFeedback.discoveredNewPlace === true ? "pilot-feedback__btn pilot-feedback__btn--active" : "pilot-feedback__btn"}
              onClick={() => setPilotFeedback({ discoveredNewPlace: true })}
            >
              Yes
            </button>
            <button
              type="button"
              className={pilotFeedback.discoveredNewPlace === false ? "pilot-feedback__btn pilot-feedback__btn--active" : "pilot-feedback__btn"}
              onClick={() => setPilotFeedback({ discoveredNewPlace: false })}
            >
              No
            </button>
          </div>
        </div>
        <div className="pilot-feedback__row">
          <span>Would you use this to explore your neighborhood again?</span>
          <div className="pilot-feedback__buttons">
            <button
              type="button"
              className={pilotFeedback.wouldExploreAgain === true ? "pilot-feedback__btn pilot-feedback__btn--active" : "pilot-feedback__btn"}
              onClick={() => setPilotFeedback({ wouldExploreAgain: true })}
            >
              Yes
            </button>
            <button
              type="button"
              className={pilotFeedback.wouldExploreAgain === false ? "pilot-feedback__btn pilot-feedback__btn--active" : "pilot-feedback__btn"}
              onClick={() => setPilotFeedback({ wouldExploreAgain: false })}
            >
              No
            </button>
          </div>
        </div>
      </div>

      <h2>For business owners</h2>
      <ul className="settings-list">
        <li>
          <button type="button" onClick={() => navigate("/merchant")}>
            <span>
              <StorefrontIcon /> I am a merchant
            </span>
            <ChevronRightIcon />
          </button>
        </li>
      </ul>

      <h2>Settings</h2>
      <ul className="settings-list">
        <li>
          <button type="button" onClick={() => setShowResetConfirm(true)}>
            <span>Reset progress</span>
            <ChevronRightIcon />
          </button>
        </li>
      </ul>

      {showResetConfirm && (
        <ConfirmModal
          title="Reset progress?"
          body="This restores the starting state — East Village Books collected, Coffee Project not yet collected, and all points, badges and redemptions reset."
          confirmLabel="Reset progress"
          onConfirm={() => {
            resetDemo();
            setShowResetConfirm(false);
          }}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}
    </div>
  );
}
