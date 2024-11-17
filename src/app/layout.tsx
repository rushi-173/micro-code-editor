import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/utils/tailwind";
import { EditorProvider } from "@/contexts/editor-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
      <body className={cn("antialiased", inter.variable)}>
        <EditorProvider>{children}</EditorProvider>
      </body>
    </html>
  );
}
