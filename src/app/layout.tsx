import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

// STYLES
import "./globals.css";

// PROVIDERS
import Providers from "@/providers";

// COMPONENTS
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

// FONTS
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

// METADATA
export const metadata: Metadata = {
  title: "Pokomen",
  description: "A premium Pokomen application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
