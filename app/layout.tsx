import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ORIGIN_URL } from "@/utils/helpers";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Summarizer.ai",
  description: "Now you can save hours by transforming your PDF into clear and concise summaries in seconds using AI",
  openGraph: {
    images: [
      {
        url: '/og-image.png',
      },
    ],
  },
  metadataBase: new URL(ORIGIN_URL),
  alternates: {
    canonical: ORIGIN_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
         <Header />
         <main className="flex-1">
          {children}
         </main>
         <Footer />
        </div>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
