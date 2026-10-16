import { useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useBusiness } from "../hooks/useBusinesses";
import { useAppStore } from "../store/useAppStore";
import { MerchantBackLink } from "../components/MerchantBackLink";
import type { CatalogItem } from "../data/types";

export function MerchantMenuPage() {
  const { businessId } = useParams();
  const business = useBusiness(businessId);
  const updateCatalog = useAppStore((s) => s.updateCatalog);

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemPrice, setEditItemPrice] = useState("");

  if (!business) {
    return <p>Business not found.</p>;
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

  return (
    <div className="merchant-page">
      <MerchantBackLink businessId={business.id} businessName={business.name} />

      <h1>Menu</h1>

      <h2>Add a menu item</h2>
      <form className="merchant-page__form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          aria-label="Item name"
        />
        <input
          type="number"
          placeholder="Price (USD)"
          min={0.01}
          step="0.01"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          aria-label="Item price in dollars"
        />
        <button type="submit" className="merchant-page__cta">
          Add item
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
                aria-label="Edit item name"
              />
              <input
                type="number"
                min={0.01}
                step="0.01"
                value={editItemPrice}
                onChange={(e) => setEditItemPrice(e.target.value)}
                aria-label="Edit item price"
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
    </div>
  );
}
