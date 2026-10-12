import { useState } from "react";
import { businesses } from "../data/businesses";
import { badges } from "../data/badges";
import { useAppStore } from "../store/useAppStore";

const TABS = ["Coupons", "Points", "Badges"] as const;

export function RewardsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>("Points");
  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const collectedBusinessIds = useAppStore((s) => s.collectedBusinessIds);
  const redeemedCouponIds = useAppStore((s) => s.redeemedCouponIds);
  const earnedBadgeIds = useAppStore((s) => s.earnedBadgeIds);
  const redeemCoupon = useAppStore((s) => s.redeemCoupon);

  const availableCoupons = businesses.filter(
    (b) => b.couponReward && collectedBusinessIds.includes(b.id),
  );

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
        <p>Earn 100 points each time you collect a property.</p>
      )}

      {tab === "Coupons" && (
        <ul className="rewards-page__coupons">
          {availableCoupons.length === 0 && <li>No coupons yet — collect a property to earn one.</li>}
          {availableCoupons.map((b) => {
            const redeemed = redeemedCouponIds.includes(b.id);
            return (
              <li key={b.id}>
                {b.name}: {b.couponReward}{" "}
                <button type="button" disabled={redeemed} onClick={() => redeemCoupon(b.id)}>
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
