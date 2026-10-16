import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, StorefrontIcon } from "./icons";

export function MerchantShell({ children }: { children: ReactNode }) {
  return (
    <div className="merchant-shell" data-theme="merchant">
      <header className="merchant-shell__header">
        <Link to="/app/profile" className="merchant-shell__exit" aria-label="Exit merchant portal">
          <ArrowLeftIcon />
        </Link>
        <span className="merchant-shell__brand">
          <StorefrontIcon />
          Merchant Portal
        </span>
      </header>
      <main className="merchant-shell__content">{children}</main>
    </div>
  );
}
