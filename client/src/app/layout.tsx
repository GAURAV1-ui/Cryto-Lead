"use client";
import "./globals.css";
import { Inter, Orbitron, Manrope } from 'next/font/google';
import Navbar from "@/components/layout/Navbar";
import QueryProvider from "@/providers/QueryProvider";

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`${inter.variable} ${orbitron.variable} ${manrope.variable} bg-gray-900 text-gray-100`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <div className="min-h-screen font-manrope">
            <Navbar />
            <main className="font-manrope">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
