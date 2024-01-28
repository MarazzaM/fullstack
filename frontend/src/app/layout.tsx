// These styles apply to every route in the application
import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
// import NavigationMenu from "@/components/ui/NavMenu/NavigationMenu";
import { ThemeProvider } from "@/components/ui/modular/theme-provider";
// import { SiteHeader } from "@/components/site-header"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Next.js Prisma Postgres Starter";
const description =
  "This is a Next.js starter";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("http://localhost:3000/"),

  //default to localhost:3000, even tho the URL is required for Auth
  // themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.variable}>
        {/* <Toaster /> */}
        <Suspense fallback="Loading...">
          {/* AuthStatus is an example component in how to use the auth info client-side */}
          {/* @ts-expect-error Async Server Component */}
          {/* <AuthStatus /> */}
        </Suspense>
        {/* <NavigationMenu /> */}
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <SiteHeader /> */}
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
