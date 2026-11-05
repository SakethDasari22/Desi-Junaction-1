import React from "react";
import { IMAGES } from "../data/assets";

export default function Gallery() {
  const photos = [
    {
      id: "ph-1",
      src: IMAGES.logo,
      title: "Desi Junction Brand Emblem",
      category: "Brand Identity",
      description: "Our circular hand-crafted brand emblem proudly representing authentic Indian street cuisine.",
      isPlaceholder: false,
    },
    {
      id: "ph-2",
      src: IMAGES.samosaChaat,
      title: "Samosa chaat",
      category: "Chats & Snacks",
      description: "Crispy savory samosas topped with spicy chutneys, yogurt, onions, and fine sev.",
      isPlaceholder: false,
    },
    {
      id: "ph-3",
      src: IMAGES.hakkaNoodles,
      title: "Street Hakka noodles",
      category: "Indo-Chinese Fusion",
      description: "Steaming hot, wok-tossed Hakka noodles with crunchy garlic, peppers, and cabbage.",
      isPlaceholder: false,
    },
    {
      id: "ph-4",
      src: IMAGES.masalaDosa,
      title: "Masala dosa",
      category: "South Indian Delights",
      description: "Freshly poured rice-crepe stuffed with mashed potatoes, served with coconut and tomato chutneys.",
      isPlaceholder: false,
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-dark-black border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.06] text-cream">
            From the truck
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
          {photos.filter((photo) => photo.id !== "ph-1").map((photo) => (
            <figure key={photo.id} className="group" id={`gallery-item-${photo.id}`}>
              <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-card-black border border-cream/10">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="mt-4">
                <h3 className="font-serif text-xl text-cream font-medium">{photo.title}</h3>
                <p className="text-sm text-cream-dim leading-6 mt-1.5 max-w-sm">{photo.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
