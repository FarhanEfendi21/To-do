import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/ui/SplashScreen";
import { EtheralShadow } from "@/components/ui/etheral-shadow";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const APP_NAME = "KuliahTasks";
const APP_DESCRIPTION = "To-Do List Tugas Kuliah — Kelola tugas dengan mudah dan terorganisir";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[var(--font-plus-jakarta)] antialiased bg-[#FAFAFA]">
        <SplashScreen />
        
        {/* Global Ethereal Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <EtheralShadow 
            color="rgba(0, 0, 0, 0.1)"
            animation={{ scale: 100, speed: 60 }}
            noise={{ opacity: 0.3, scale: 1.2 }}
            sizing="fill"
          />
        </div>

        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
