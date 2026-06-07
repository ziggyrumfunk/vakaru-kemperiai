import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import VehicleDetail from "@/components/VehicleDetail";
import { altMeta } from "@/lib/seo";
import { getCampers, getVehicleBySlug } from "@/lib/data";

export const revalidate = 30;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCampers()).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v) return {};
  return { title: v.name, description: v.descriptionLt ?? v.name, alternates: altMeta(locale, `/kemperiai/${slug}`), openGraph: { title: v.name, images: v.heroImage ? [v.heroImage] : [] } };
}

export default async function CamperDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle || vehicle.category !== "camper") notFound();
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: vehicle.name, image: vehicle.images,
    description: vehicle.descriptionLt ?? vehicle.name, category: "Motorhome rental",
    brand: { "@type": "Brand", name: vehicle.chassis ?? "Vakarų kemperiai" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <VehicleDetail vehicle={vehicle} />
    </>
  );
}
