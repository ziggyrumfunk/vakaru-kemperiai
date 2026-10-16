import Reveal from "./Reveal";
import VehicleCard from "./VehicleCard";
import type { Vehicle } from "@/data/vehicles";

export default function VehicleGrid({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <section className="wrap border-t border-line pb-[var(--section)] pt-12 sm:pt-16">
      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20">
        {vehicles.map((v, i) => (
          <Reveal key={v.slug} delay={(i % 3) * 90}>
            <VehicleCard vehicle={v} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
