import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useBusiness } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import { ArrowLeftIcon } from "../components/icons";
import type { CatalogItem } from "../data/types";

const SUB_TABS = ["Profile", "Menu", "Offer", "Redemptions", "Reports"] as const;

export function MerchantDashboardPage() {
  const { businessId } = useParams();
  const business = useBusiness(businessId);

  const updateBusinessProfile = useAppStore((s) => s.updateBusinessProfile);
  const updateCatalog = useAppStore((s) => s.updateCatalog);
  const updateReward = useAppStore((s) => s.updateReward);
  const confirmRedemption = useAppStore((s) => s.confirmRedemption);
  const isPending = useAppStore((s) =>
    business ? s.pendingRedemptionBusinessIds.includes(business.id) : false,
  );
  const isRedeemed = useAppStore((s) =>
    business ? s.redeemedRewardBusinessIds.includes(business.id) : false,
  );
  const visitCount = useAppStore((s) =>
    business ? s.visitLog.filter((v) => v.businessId === business.id).length : 0,
  );
  const incrementalPurchaseAnswer = useAppStore((s) =>
    business ? s.incrementalPurchaseByBusiness[business.id] : undefined,
  );
  const valueFeedbackAnswer = useAppStore((s) =>
    business ? s.valueFeedbackByBusiness[business.id] : undefined,
  );

  const [subTab, setSubTab] = useState<typeof SUB_TABS[number]>("Profile");

  const [profileName, setProfileName] = useState("");
  const [profileCategory, setProfileCategory] = useState("");
  const [profileAddress, setProfileAddress] = useState("");
  const [profileDescription, setProfileDescription] = useState("");

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemPrice, setEditItemPrice] = useState("");

  const [rewardTitle, setRewardTitle] = useState("");
  const [rewardCost, setRewardCost] = useState("");
  const [rewardInstant, setRewardInstant] = useState(false);

  useEffect(() => {
    if (!business) return;
    setSubTab("Profile");
    setProfileName(business.name);
    setProfileCategory(business.category);
    setProfileAddress(business.address);
    setProfileDescription(business.description);
    setRewardTitle(business.reward.title);
    setRewardCost(String(business.reward.pointsCost));
    setRewardInstant(!!business.reward.instant);
    setEditingItemId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId]);

  if (!business) {
    return <p>Business not found.</p>;
  }

  function handleSaveProfile(e: FormEvent) {
    e.preventDefault();
    if (!profileName.trim() || !profileCategory.trim() || !profileAddress.trim()) return;
    updateBusinessProfile(business!.id, {
      name: profileName.trim(),
      category: profileCategory.trim(),
      address: profileAddress.trim(),
      description: profileDescription.trim(),
    });
  }

  function handleAddItem(e: FormEvent) {
    e.preventDefault();
    const price = Number(itemPrice);
    if (!itemName.trim() || !Number.isFinite(price) || price <= 0) return;
    const next: CatalogItem[] = [
      ...business!.catalog,
      { id: `item-${Date.now()}`, name: itemName.trim(), priceUSD: price, isMock: true },
    ];
    updateCatalog(business!.id, next);
    setItemName("");
    setItemPrice("");
  }

  function startEditItem(item: CatalogItem) {
    setEditingItemId(item.id);
    setEditItemName(item.name);
    setEditItemPrice(String(item.priceUSD));
  }

  function saveEditItem(id: string) {
    const price = Number(editItemPrice);
    if (!editItemName.trim() || !Number.isFinite(price) || price <= 0) return;
    const next = business!.catalog.map((i) =>
      i.id === id ? { ...i, name: editItemName.trim(), priceUSD: price } : i,
    );
    updateCatalog(business!.id, next);
    setEditingItemId(null);
  }

  function deleteItem(id: string) {
    updateCatalog(
      business!.id,
      business!.catalog.filter((i) => i.id !== id),
    );
  }

  function handleSaveReward(e: FormEvent) {
    e.preventDefault();
    const cost = Number(rewardCost);
    if (!rewardTitle.trim() || !Number.isFinite(cost) || cost < 0) return;
    updateReward(business!.id, {
      title: rewardTitle.trim(),
      pointsCost: cost,
      mockOnly: true,
      ...(rewardInstant ? { instant: true } : {}),
    });
  }

  return (
    <div className="merchant-page">
      <Link to="/merchant" className="merchant-dashboard__switch">
        <ArrowLeftIcon /> Switch business
      </Link>

      <h1>{business.name}</h1>
      <p className="business-detail__meta">
        {business.category} · {business.address}
      </p>

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

      {subTab === "Profile" && (
        <>
          <h2>Business profile</h2>
          <form className="merchant-page__form" onSubmit={handleSaveProfile}>
            <input
              type="text"
              placeholder="Business name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category (e.g. Coffee Shop)"
              value={profileCategory}
              onChange={(e) => setProfileCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={profileAddress}
              onChange={(e) => setProfileAddress(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={profileDescription}
              onChange={(e) => setProfileDescription(e.target.value)}
            />
            <button type="submit" className="merchant-page__cta">
              Save Profile
            </button>
          </form>
        </>
      )}

      {subTab === "Menu" && (
        <>
          <h2>Add a menu item</h2>
          <form className="merchant-page__form" onSubmit={handleAddItem}>
            <input
              type="text"
              placeholder="Item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price (USD)"
              min={0.01}
              step="0.01"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <button type="submit" className="merchant-page__cta">
              Add Item
            </button>
          </form>

          <ul className="merchant-page__offer-list">
            {business.catalog.length === 0 && <li className="merchant-page__empty">No menu items yet.</li>}
            {business.catalog.map((item) =>
              editingItemId === item.id ? (
                <li key={item.id} className="merchant-page__offer merchant-page__offer--editing">
                  <input
                    type="text"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                  />
                  <input
                    type="number"
                    min={0.01}
                    step="0.01"
                    value={editItemPrice}
                    onChange={(e) => setEditItemPrice(e.target.value)}
                  />
                  <button type="button" onClick={() => saveEditItem(item.id)}>
                    Save
                  </button>
                  <button type="button" onClick={() => setEditingItemId(null)}>
                    Cancel
                  </button>
                </li>
              ) : (
                <li key={item.id} className="merchant-page__offer">
                  <span>
                    {item.name} — ${item.priceUSD.toFixed(2)}
                  </span>
                  <span className="merchant-page__row-actions">
                    <button type="button" onClick={() => startEditItem(item)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteItem(item.id)}>
                      Delete
                    </button>
                  </span>
                </li>
              ),
            )}
          </ul>
        </>
      )}

      {subTab === "Offer" && (
        <>
          <h2>Reward offer</h2>
          <form className="merchant-page__form" onSubmit={handleSaveReward}>
            <input
              type="text"
              placeholder="Offer title (e.g. 10% off any drink)"
              value={rewardTitle}
              onChange={(e) => setRewardTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Points cost"
              min={0}
              value={rewardCost}
              onChange={(e) => setRewardCost(e.target.value)}
              disabled={rewardInstant}
            />
            <label className="merchant-page__checkbox">
              <input
                type="checkbox"
                checked={rewardInstant}
                onChange={(e) => setRewardInstant(e.target.checked)}
              />
              Instant (free with collection)
            </label>
            <button type="submit" className="merchant-page__cta">
              Save Offer
            </button>
          </form>
        </>
      )}

      {subTab === "Redemptions" && (
        <>
          <h2>Redemption status</h2>
          <ul className="merchant-page__redemption-list">
            {isPending && (
              <li className="merchant-page__redemption">
                <div>
                  <strong>Reward requested: "{business.reward.title}"</strong>
                  <span>Awaiting your confirmation</span>
                </div>
                <button type="button" onClick={() => confirmRedemption(business!.id)}>
                  Confirm Redemption
                </button>
              </li>
            )}
            {isRedeemed && (
              <li className="merchant-page__redemption">
                <div>
                  <strong>Reward confirmed: "{business.reward.title}"</strong>
                </div>
                <span className="status-pill status-pill--collected">Confirmed</span>
              </li>
            )}
            {!isPending && !isRedeemed && (
              <li className="merchant-page__empty">No pending redemptions right now.</li>
            )}
          </ul>
        </>
      )}

      {subTab === "Reports" && (
        <>
          <h2>Activity report</h2>
          <ul className="settings-list settings-list--readonly">
            <li>
              <span>Visits confirmed</span>
              <strong>{visitCount}</strong>
            </li>
            <li>
              <span>Reward redeemed</span>
              <strong>{isRedeemed ? "Yes" : isPending ? "Pending" : "Not yet"}</strong>
            </li>
            <li>
              <span>Incremental purchase reported</span>
              <strong>
                {incrementalPurchaseAnswer === undefined
                  ? "Not asked yet"
                  : incrementalPurchaseAnswer
                    ? "Yes"
                    : "No"}
              </strong>
            </li>
            <li>
              <span>Said collecting was worth it</span>
              <strong>
                {valueFeedbackAnswer === undefined
                  ? "Not asked yet"
                  : valueFeedbackAnswer
                    ? "Yes"
                    : "No"}
              </strong>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
