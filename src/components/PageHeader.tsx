import Image from "next/image";

export default function PageHeader({
  eyebrow,
  title,
  intro,
  image = "/images/camper-1.webp",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt="" fill priority className="object-cover opacity-[0.14]" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-paper/88 to-paper" />
      </div>
      <div className="container-luxe pt-36 pb-12 sm:pt-44 sm:pb-16">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="display text-4xl sm:text-6xl max-w-3xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">{intro}</p>}
      </div>
    </div>
  );
}
