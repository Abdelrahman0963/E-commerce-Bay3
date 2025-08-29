import type { Metadata } from "next";
import { Cairo, Poppins } from "next/font/google";
import "../globals.css";
import LayoutProvider from "../components/LayoutProvider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Providers } from "../queryProviders/Providers";
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-cairo",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bay3",
  description:
    "Bay3 A marketplace for buying and selling used and new products",
  icons: {
    icon: "/Bay3icon.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const massages = (await import(`../../messages/${locale}.json`)).default;
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={
          !locale.startsWith("ar") ? poppins.className : cairo.className
        }
      >
        <Providers>
          <NextIntlClientProvider messages={massages || {}}>
            <LayoutProvider>{children}</LayoutProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
