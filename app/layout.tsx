import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "HCB Fee Caluclator",
  description: "Calculate the fee for your HCB organization donation",
};

import { ThemeProvider } from "@/components/themeProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
