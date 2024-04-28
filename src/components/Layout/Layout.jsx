import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import css from "./Layout.module.css";
export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <Navigation></Navigation>
      <Suspense fallback={<p>Loading page...</p>}>{children}</Suspense>
    </div>
  );
}
