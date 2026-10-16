import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBusinesses } from "../hooks/useBusinesses";
import { badges } from "../data/badges";
import { neighborhood } from "../data/neighborhood";
import { useAppStore } from "../store/useAppStore";
import { BusinessCard } from "../components/BusinessCard";
import { ProgressBar } from "../components/ProgressBar";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { BookIcon, UtensilsIcon, BagIcon, StarIcon, LockIcon, CATEGORY_ICON_BY_RAW_CATEGORY } from "../components/icons";
import { RedeemConfirmModal } from "../components/RedeemConfirmModal";
import type { Business, CategoryGroup } from "../data/types";

const CATEGORIES: Array<{ label: "All" | CategoryGroup; Icon?: typeof BookIcon }> = [
  { label: "All" },
  { label: "Food & Drink", Icon: UtensilsIcon },
  { label: "Culture", Icon: BookIcon },
  { label: "Fashion", Icon: BagIcon },
];

const SUB_TABS = ["Properties", "Rewards", "Badges"] as const;

function badgeProgress(
  badgeId: string,
  collectedCount: number,
  totalCount: number,
  collected: Business[],
): string | null {
  if (badgeId === "block-explorer") return `${Math.min(collectedCount, 3)} / 3 collected`;
  if (badgeId === "local-legend") return `${collectedCount} / ${totalCount} collected`;
  if (badgeId === "culture-collector") {
    const hasBookstore = collected.some((b) => b.category === "Books") ? 1 : 0;
    const musicCount = Math.min(collected.filter((b) => b.category === "Music").length, 2);
    return `${hasBookstore + musicCount} / 3 requirements met`;
  }
  return null;
}

export function CollectionPage() {
  const [params] = useSearchParams();
  const initialTab = SUB_TABS.find((t) => t.toLowerCase() === params.get("tab")) ?? "Properties";
  const [subTab, setSubTab] = useState<typeof SUB_TABS[number]>(initialTab);
  const [category, setCategory] = useState<"All" | CategoryGroup>("All");
  const [redeemTarget, setRedeemTarget] = useState<Business | null>(null);

  const pointsBalance = useAppStore((s) => s.pointsBalance);
  const collectedBusinessIds = useAppStore((s) => s.collectedBusinessIds);
  const redeemedRewardBusinessIds = useAppStore((s) => s.redeemedRewardBusinessIds);
  const pendingRedemptionBusinessIds = useAppStore((s) => s.pendingRedemptionBusinessIds);
  const earnedBadgeIds = useAppStore((s) => s.earnedBadgeIds);
  const canRedeem = useAppStore((s) => s.canRedeem);
  const getEffectiveReward = useAppStore((s) => s.getEffectiveReward);
  const businesses = useBusinesses();

  const filtered = businesses.filter((b) => category === "All" || b.categoryGroup === category);
  const collectedBusinesses = businesses.filter((b) => collectedBusinessIds.includes(b.id));
  const availableRewards = collectedBusinesses.filter((b) => getEffectiveReward(b.id)?.enabled !== false);

  const instantRewards = availableRewards.filter((b) => getEffectiveReward(b.id)?.instant);
  const pointsRewards = availableRewards.filter((b) => !getEffectiveReward(b.id)?.instant);

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
            {filtered.map((business, index) => (
              <BusinessCard key={business.id} business={business} index={index} />
            ))}
          </div>
        </>
      )}

      {subTab === "Rewards" && (
        <div className="reward-wallet">
          <section>
            <h2>Unlocked with collection</h2>
            <ul className="reward-list">
              {instantRewards.length === 0 && (
                <li className="reward-card reward-card--empty">No instant rewards yet.</li>
              )}
              {instantRewards.map((b) => {
                const reward = getEffectiveReward(b.id)!;
                const redeemed = redeemedRewardBusinessIds.includes(b.id);
                const pending = pendingRedemptionBusinessIds.includes(b.id);
                const eligible = canRedeem(b.id);
                return (
                  <li key={b.id} className={`reward-card${redeemed ? " reward-card--redeemed" : ""}`}>
                    <PlaceholderImage
                      categoryGroup={b.categoryGroup}
                      rawCategory={b.category}
                      className="reward-card__image"
                      alt={`${b.name} category icon`}
                    />
                    <div className="reward-card__body">
                      <strong>{reward.title}</strong>
                      <span>{b.name}</span>
                      <span className="reward-card__cost">Free with collection</span>
                    </div>
                    <button type="button" disabled={redeemed || pending || !eligible} onClick={() => setRedeemTarget(b)}>
                      {redeemed ? "Redeemed" : pending ? "Pending" : "Redeem"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2>Earn with points</h2>
            <ul className="reward-list">
              {pointsRewards.length === 0 && (
                <li className="reward-card reward-card--empty">
                  No points rewards yet — collect a property to unlock one.
                </li>
              )}
              {pointsRewards.map((b) => {
                const reward = getEffectiveReward(b.id)!;
                const redeemed = redeemedRewardBusinessIds.includes(b.id);
                const pending = pendingRedemptionBusinessIds.includes(b.id);
                const eligible = canRedeem(b.id);
                const pointsShort = Math.max(reward.pointsCost - pointsBalance, 0);
                return (
                  <li key={b.id} className={`reward-card${redeemed ? " reward-card--redeemed" : ""}`}>
                    <PlaceholderImage
                      categoryGroup={b.categoryGroup}
                      rawCategory={b.category}
                      className="reward-card__image"
                      alt={`${b.name} category icon`}
                    />
                    <div className="reward-card__body">
                      <strong>{reward.title}</strong>
                      <span>{b.name}</span>
                      <span className="reward-card__cost">
                        {!redeemed && !eligible && pointsShort > 0
                          ? `${pointsShort} more points needed`
                          : `${reward.pointsCost} pts`}
                      </span>
                    </div>
                    <button type="button" disabled={redeemed || pending || !eligible} onClick={() => setRedeemTarget(b)}>
                      {redeemed ? "Redeemed" : pending ? "Pending" : "Redeem"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}

      {subTab === "Badges" && (
        <ul className="badge-grid">
          {badges.map((badge) => {
            const earned = earnedBadgeIds.includes(badge.id);
            const business = businesses.find((b) => b.id === badge.associatedBusinessId);
            const Icon = business ? CATEGORY_ICON_BY_RAW_CATEGORY[business.category] : StarIcon;
            const progress = earned
              ? null
              : badgeProgress(badge.id, collectedBusinessIds.length, businesses.length, collectedBusinesses);
            return (
              <li key={badge.id} className={earned ? "badge-tile badge-tile--earned" : "badge-tile"}>
                <span className="badge-tile__icon">
                  {earned ? Icon ? <Icon /> : <StarIcon /> : <LockIcon />}
                </span>
                <strong>{badge.title}</strong>
                <p>{badge.description}</p>
                {progress && <span className="badge-tile__progress">{progress}</span>}
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
