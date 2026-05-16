import type { Metadata } from "next";
import { DM_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/lib/FormContext";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-family-mono",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-family-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project Kickstarter | IBM Bob Hackathon",
  description: "Describe your idea. Bob builds the blueprint.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${dmMono.variable} ${dmSerif.variable}`}
    >
      <body className={`min-h-full antialiased ${dmMono.className}`}>
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}
