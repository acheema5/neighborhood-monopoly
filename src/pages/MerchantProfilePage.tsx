import { useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useBusiness } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import { MerchantBackLink } from "../components/MerchantBackLink";
import { CheckIcon } from "../components/icons";

export function MerchantProfilePage() {
  const { businessId } = useParams();
  const business = useBusiness(businessId);
  const updateBusinessProfile = useAppStore((s) => s.updateBusinessProfile);

  const [profileName, setProfileName] = useState(() => business?.name ?? "");
  const [profileCategory, setProfileCategory] = useState(() => business?.category ?? "");
  const [profileAddress, setProfileAddress] = useState(() => business?.address ?? "");
  const [profileDescription, setProfileDescription] = useState(() => business?.description ?? "");
  const [profileSaved, setProfileSaved] = useState(false);

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
    setProfileSaved(true);
  }

  return (
    <div className="merchant-page">
      <MerchantBackLink businessId={business.id} businessName={business.name} />

      <h1>Business profile</h1>
      <p>Changes here update the consumer-facing listing immediately.</p>

      <form className="merchant-page__form" onSubmit={handleSaveProfile}>
        <label className="merchant-page__field">
          <span>Business name</span>
          <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
        </label>
        <label className="merchant-page__field">
          <span>Category</span>
          <input type="text" value={profileCategory} onChange={(e) => setProfileCategory(e.target.value)} />
        </label>
        <label className="merchant-page__field">
          <span>Address</span>
          <input type="text" value={profileAddress} onChange={(e) => setProfileAddress(e.target.value)} />
        </label>
        <label className="merchant-page__field">
          <span>Description</span>
          <textarea value={profileDescription} onChange={(e) => setProfileDescription(e.target.value)} />
        </label>
        <button type="submit" className="merchant-page__cta">
          Save profile
        </button>
      </form>

      {profileSaved && (
        <div className="merchant-page__save-confirm">
          <p className="merchant-page__success">
            <CheckIcon /> Saved — the consumer listing is up to date.
          </p>
          <MerchantBackLink businessId={business.id} businessName={business.name} variant="button" />
        </div>
      )}
    </div>
  );
}
