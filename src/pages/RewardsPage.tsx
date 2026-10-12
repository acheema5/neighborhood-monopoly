import { useState } from "react";
import { businesses } from "../data/businesses";
import { badges } from "../data/badges";
import { useAppStore } from "../store/useAppStore";

const TABS = ["Rewards", "Points", "Badges"] as const;

export function RewardsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>("Points");
  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const collectedBusinessIds = useAppStore((s) => s.collectedBusinessIds);
  const redeemedRewardBusinessIds = useAppStore((s) => s.redeemedRewardBusinessIds);
  const earnedBadgeIds = useAppStore((s) => s.earnedBadgeIds);
  const canRedeem = useAppStore((s) => s.canRedeem);
  const redeemReward = useAppStore((s) => s.redeemReward);

  const availableRewards = businesses.filter((b) => collectedBusinessIds.includes(b.id));

  return (
    <div className="rewards-page">
      <h1>Rewards</h1>
      <p className="rewards-page__points">{pointsBalance} points</p>

      <div className="rewards-page__tabs">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={t === tab ? "chip chip--active" : "chip"}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Points" && (
        <>
          <p>Each quest task earns points immediately. Collecting a property adds an unlock bonus on top.</p>
          <p className="demo-disclaimer">Points are a mock in-game currency — not real currency.</p>
        </>
      )}

      {tab === "Rewards" && (
        <ul className="rewards-page__coupons">
          {availableRewards.length === 0 && (
            <li>No rewards yet — collect a property to unlock one.</li>
          )}
          {availableRewards.map((b) => {
            const redeemed = redeemedRewardBusinessIds.includes(b.id);
            const eligible = canRedeem(b.id);
            return (
              <li key={b.id}>
                <span>
                  {b.name}: {b.reward.title} ({b.reward.pointsCost} pts)
                </span>
                <button
                  type="button"
                  disabled={redeemed || !eligible}
                  onClick={() => redeemReward(b.id)}
                >
                  {redeemed ? "Redeemed" : "Use"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {tab === "Badges" && (
        <ul className="rewards-page__badges">
          {badges.map((badge) => {
            const earned = earnedBadgeIds.includes(badge.id);
            return (
              <li key={badge.id} className={earned ? "badge badge--earned" : "badge"}>
                <strong>{badge.title}</strong>
                <p>{badge.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
