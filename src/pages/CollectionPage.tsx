import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { businesses } from "../data/businesses";
import { badges } from "../data/badges";
import { neighborhood } from "../data/neighborhood";
import { useAppStore } from "../store/useAppStore";
import { BusinessCard } from "../components/BusinessCard";
import { ProgressBar } from "../components/ProgressBar";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { BookIcon, UtensilsIcon, BagIcon, StarIcon, CATEGORY_ICON_BY_RAW_CATEGORY } from "../components/icons";
import { RedeemConfirmModal } from "../components/RedeemConfirmModal";
import type { Business, CategoryGroup } from "../data/types";

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
  const [redeemTarget, setRedeemTarget] = useState<Business | null>(null);

  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const collectedBusinessIds = useAppStore((s) => s.collectedBusinessIds);
  const redeemedRewardBusinessIds = useAppStore((s) => s.redeemedRewardBusinessIds);
  const earnedBadgeIds = useAppStore((s) => s.earnedBadgeIds);
  const canRedeem = useAppStore((s) => s.canRedeem);

  const filtered = businesses.filter((b) => category === "All" || b.categoryGroup === category);
  const availableRewards = businesses.filter((b) => collectedBusinessIds.includes(b.id));

  return (
    <div className="collection-page">
      <div className="collection-page__header">
        <h1>Collection</h1>
        <span className="points-pill">
          <StarIcon /> {pointsBalance} pts
        </span>
      </div>
      <p>
        {collectedBusinessIds.length} / {businesses.length} properties collected in {neighborhood.name}
      </p>
      <ProgressBar value={collectedBusinessIds.length} max={businesses.length} />

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
        <ul className="reward-list">
          {availableRewards.length === 0 && (
            <li className="reward-card reward-card--empty">
              No rewards yet — collect a property to unlock one.
            </li>
          )}
          {availableRewards.map((b) => {
            const redeemed = redeemedRewardBusinessIds.includes(b.id);
            const eligible = canRedeem(b.id);
            const pointsShort = b.reward.pointsCost - pointsBalance;
            return (
              <li key={b.id} className="reward-card">
                <PlaceholderImage category={b.categoryGroup} className="reward-card__image" />
                <div className="reward-card__body">
                  <strong>{b.reward.title}</strong>
                  <span>{b.name}</span>
                  <span className="reward-card__cost">
                    {b.reward.instant
                      ? "Free with collection"
                      : !redeemed && !eligible
                        ? `${pointsShort} more points needed`
                        : `${b.reward.pointsCost} pts`}
                  </span>
                </div>
                <button type="button" disabled={redeemed || !eligible} onClick={() => setRedeemTarget(b)}>
                  {redeemed ? "Redeemed" : "Use"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {subTab === "Badges" && (
        <ul className="badge-list">
          {badges.map((badge) => {
            const earned = earnedBadgeIds.includes(badge.id);
            const business = businesses.find((b) => b.id === badge.associatedBusinessId);
            const Icon = business ? CATEGORY_ICON_BY_RAW_CATEGORY[business.category] : StarIcon;
            return (
              <li key={badge.id} className={earned ? "badge badge--earned" : "badge"}>
                <span className="badge__icon">{Icon ? <Icon /> : <StarIcon />}</span>
                <span className="badge__text">
                  <strong>{badge.title}</strong>
                  <p>{badge.description}</p>
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {redeemTarget && (
        <RedeemConfirmModal business={redeemTarget} onClose={() => setRedeemTarget(null)} />
      )}
    </div>
  );
}
