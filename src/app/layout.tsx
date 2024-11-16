import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JS Code",
  description: "A minimalist code editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
