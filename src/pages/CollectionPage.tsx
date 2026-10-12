import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { businesses } from "../data/businesses";
import { badges } from "../data/badges";
import { neighborhood } from "../data/neighborhood";
import { useAppStore } from "../store/useAppStore";
import { BusinessCard } from "../components/BusinessCard";
import { BookIcon, UtensilsIcon, BagIcon } from "../components/icons";
import type { CategoryGroup } from "../data/types";

const CATEGORIES: Array<{ label: "All" | CategoryGroup; Icon?: typeof BookIcon }> = [
  { label: "All" },
  { label: "Food & Drink", Icon: UtensilsIcon },
  { label: "Culture", Icon: BookIcon },
  { label: "Fashion", Icon: BagIcon },
];

const SUB_TABS = ["Properties", "Rewards", "Badges"] as const;

export function CollectionPage() {
  const [params] = useSearchParams();
  const initialTab = SUB_TABS.find((t) => t.toLowerCase() === params.get("tab")) ?? "Properties";
  const [subTab, setSubTab] = useState<typeof SUB_TABS[number]>(initialTab);
  const [category, setCategory] = useState<"All" | CategoryGroup>("All");

  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const collectedBusinessIds = useAppStore((s) => s.collectedBusinessIds);
  const redeemedRewardBusinessIds = useAppStore((s) => s.redeemedRewardBusinessIds);
  const earnedBadgeIds = useAppStore((s) => s.earnedBadgeIds);
  const canRedeem = useAppStore((s) => s.canRedeem);
  const redeemReward = useAppStore((s) => s.redeemReward);

  const filtered = businesses.filter((b) => category === "All" || b.categoryGroup === category);
  const availableRewards = businesses.filter((b) => collectedBusinessIds.includes(b.id));

  return (
    <div className="collection-page">
      <h1>Collection</h1>
      <p>
        {collectedBusinessIds.length} / {businesses.length} properties collected in {neighborhood.name}
      </p>
      <p className="points-pill">{pointsBalance} pts</p>

      <div className="segmented">
        {SUB_TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={t === subTab ? "segmented__item--active" : ""}
            onClick={() => setSubTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === "Properties" && (
        <>
          <div className="collection-page__chips">
            {CATEGORIES.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                className={label === category ? "chip chip--active" : "chip"}
                onClick={() => setCategory(label)}
              >
                {Icon && <Icon />}
                {label}
              </button>
            ))}
          </div>

          <div className="collection-page__grid">
            {filtered.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </>
      )}

      {subTab === "Rewards" && (
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

      {subTab === "Badges" && (
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
