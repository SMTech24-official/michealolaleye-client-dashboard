import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/provider/ReduxProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Starter kit",
  description: "starter kit for nextjs with redux with persist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Toaster position="top-right" richColors />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
