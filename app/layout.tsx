import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'bootswatch/dist/darkly/bootstrap.min.css';
import NavBar from "@/components/navbar";
import SessionWrapper from "@/components/sessionWrapper";
import {TournamentProvider} from "@/context/tournamentProvider";
import {Analytics} from "@vercel/analytics/react"

const geistSans = localFont({
    src: "./game/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./game/fonts/GeistMonoVF.woff",
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
        <SessionWrapper>
            <TournamentProvider>
                <html lang="de">
                <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <NavBar/>
                {children}
                <Analytics/>
                </body>
                </html>
            </TournamentProvider>
        </SessionWrapper>
    );
}
