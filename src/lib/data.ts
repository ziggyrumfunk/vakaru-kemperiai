import { vehicles as seed, type Vehicle, type Category, type FeatureKey } from "@/data/vehicles";
import { isSupabaseConfigured, getSupabase } from "./supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToVehicle(r: any): Vehicle {
  return {
    slug: r.slug,
    name: r.name,
    category: r.category as Category,
    featured: r.featured ?? false,
    vip: r.vip ?? false,
    chassis: r.chassis ?? undefined,
    engine: r.engine ?? undefined,
    powerKw: r.power_kw ?? undefined,
    powerHp: r.power_hp ?? undefined,
    year: r.year ?? undefined,
    transmission: r.transmission ?? undefined,
    lengthCm: r.length_cm ?? undefined,
    heightCm: r.height_cm ?? undefined,
    widthCm: r.width_cm ?? undefined,
    weightKg: r.weight_kg ?? undefined,
    waterL: r.water_l ?? undefined,
    fuelTankL: r.fuel_tank_l ?? undefined,
    consumption: r.consumption ?? undefined,
    seats: r.seats ?? undefined,
    berths: r.berths ?? undefined,
    features: (r.features ?? []) as FeatureKey[],
    descriptionLt: r.description_lt ?? undefined,
    heroImage: r.hero_image ?? (r.images?.[0] ?? ""),
    images: (r.images ?? []) as string[],
  };
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  if (!isSupabaseConfigured) return seed;
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("vehicles")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error || !data || data.length === 0) return seed;
    return data.map(rowToVehicle);
  } catch {
    return seed;
  }
}

export async function getCampers(): Promise<Vehicle[]> {
  return (await getAllVehicles()).filter((v) => v.category === "camper");
}
export async function getMinibuses(): Promise<Vehicle[]> {
  return (await getAllVehicles()).filter((v) => v.category === "minibus");
}
export async function getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
  return (await getAllVehicles()).find((v) => v.slug === slug);
}
