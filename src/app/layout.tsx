import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivam Indore | Full Stack Developer & Data Analyst",
  description:
    "Portfolio of Shivam Indore — Full Stack Developer and Data Analyst specializing in Django, Next.js, and Python data libraries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body text-text-primary">{children}</body>
    </html>
  );
}
