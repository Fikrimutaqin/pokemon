// Core Next
import type { Metadata } from "next";
// Redux Toolkit
import StoreProvider from "@/store/storeProvider";
// TanStack Query
import QueryProvider from "@/providers/QueryProvider";
// Font
import { Plus_Jakarta_Sans } from "next/font/google";
// Style
import "./globals.css";
// Components
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import dynamic from 'next/dynamic';

const BackToTop = dynamic(() => import('@/components/common/buttons/BackToTop'));

// Initialize Font
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

// Initialize Metadata
export const metadata: Metadata = {
  title: "Pokomen",
  description: "A premium Pokomen application",
};

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
      </head>
      <body className="min-h-screen flex flex-col">
        <QueryProvider>
          <StoreProvider>
            <Header />
            {children}
            <Footer />
            <BackToTop />
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
