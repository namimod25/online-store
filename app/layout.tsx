import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NamiStore - Online Shopping",
  description: "Your favorite online store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6">
            <div className="container text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} NamiStore. All rights reserved.
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
