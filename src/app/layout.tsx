import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "../styles/fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM",
  description: "Redux Toolkit + RTK Query + RHF + Zod",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-indigo-50">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
