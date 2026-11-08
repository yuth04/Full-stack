import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/query-provider";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: "VENDO POS",
    template: "%s | VENDO POS",
  },
  description: "VENDO POS product management and business analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>

          <Toaster position="top-center" richColors  />
        </ThemeProvider>
      </body>
    </html>
  );
}
