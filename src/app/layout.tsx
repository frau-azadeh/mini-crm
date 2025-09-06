import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "../styles/fonts.css"

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Toaster position="top-center"/>
        {children}
      </body>
    </html>
  );
}
