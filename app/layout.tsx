import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const brice = localFont({
  src: [
    { path: "../public/fonts/Brice-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/Brice-Black.otf", weight: "900", style: "normal" }
  ],
  variable: "--font-brice"
});

const mundial = localFont({
  src: [
    { path: "../public/fonts/Mundial-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/MundialDemibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/Mundial-Bold.otf", weight: "700", style: "normal" }
  ],
  variable: "--font-mundial"
});

export const metadata: Metadata = {
  title: "THE GOOD VIBES REWARDS POOL",
  description: "Collect Badges. Grow The Ecosystem. Win Rewards.",
  icons: {
    icon: '/shaka.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${outfit.variable} ${mundial.variable} ${brice.variable} min-h-screen bg-gvc-black text-white selection:bg-gvc-gold selection:text-black font-sans`}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#121212',
              color: '#fff',
              border: '1px solid #FFE048',
              fontFamily: 'Mundial, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#FFE048',
                secondary: '#121212',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}

