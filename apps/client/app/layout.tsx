import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar, FloatingContact, CustomCursor } from "@repo/ui";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "High Traffic App - Client",
  description: "Scalable client application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background`}>
        <CustomCursor />
        <Navbar logo="Klipse" />
        <FloatingContact />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
