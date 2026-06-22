'use client';

import { usePathname } from 'next/navigation';
import { Navbar, FloatingContact, CustomCursor } from "@repo/ui";
import Footer from "./components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      <CustomCursor />
      {!isAdminPage && <Navbar logo="Klipse" />}
      {!isAdminPage && <FloatingContact />}
      <main>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
}
