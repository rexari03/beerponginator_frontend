import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The official Beerponginator",
  description: "The best app for tracking your beer pong games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/*<NavBar />*/}
        {children}
      </body>
    </html>
  );
}
