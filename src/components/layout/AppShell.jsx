import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({
  children,
  headerProps,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-[#E8F2EC]">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="min-h-screen lg:pl-[268px]">
        <Header
          {...headerProps}
          onOpenMenu={() => setMobileOpen(true)}
        />

        <main>{children}</main>
      </div>
    </div>
  );
}