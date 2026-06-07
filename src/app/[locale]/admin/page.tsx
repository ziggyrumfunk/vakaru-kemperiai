import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AdminApp from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Administravimas",
  robots: { index: false, follow: false },
};

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminApp />;
}
