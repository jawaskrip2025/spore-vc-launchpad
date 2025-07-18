import ReactQueryProvider from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';
import { cookieToWeb3AuthState } from "@web3auth/modal";
import { headers } from "next/headers";
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Title App",
  description: "Generated by create next app 14",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = await headers();
  const web3authInitialState = cookieToWeb3AuthState(headersList.get('cookie'));
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.className} antialiased`}
      >
        <NextTopLoader color="#1B8DFA" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider web3authInitialState={web3authInitialState}>
              {children}
          </ReactQueryProvider>

          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
