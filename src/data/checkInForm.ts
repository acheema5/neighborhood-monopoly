// Photo check-in form: residents confirm a visit by submitting a storefront
// photo through this Google Form instead of scanning an in-store QR code.
//
// TODO(teammate): replace these two placeholders once the real form exists.
// - CHECK_IN_FORM_BASE_URL: the form's "viewform" URL, e.g.
//   https://docs.google.com/forms/d/e/<form id>/viewform
// - SHOP_NAME_ENTRY_ID: the entry.<id> field name for the "shop name" question,
//   found by opening the form, using "Get pre-filled link", filling the shop
//   name field, and reading the entry.<id> param out of the generated URL.
const CHECK_IN_FORM_BASE_URL = "https://forms.gle/REPLACE_WITH_REAL_FORM_LINK";
const SHOP_NAME_ENTRY_ID = "entry.REPLACE_WITH_SHOP_NAME_ENTRY_ID";

export function checkInFormUrl(businessName: string): string {
  const params = new URLSearchParams({ usp: "pp_url", [SHOP_NAME_ENTRY_ID]: businessName });
  return `${CHECK_IN_FORM_BASE_URL}?${params.toString()}`;
}
