import React from "react";
import { Camera, Image, PlusCircle } from "lucide-react";
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
      title: "Delectable Samosa Chaat",
      category: "Chats & Snacks",
      description: "Crispy savory samosas topped with spicy chutneys, yogurt, onions, and fine sev.",
      isPlaceholder: false,
    },
    {
      id: "ph-3",
      src: IMAGES.hakkaNoodles,
      title: "Street Hakka Noodles",
      category: "Indo-Chinese Fusion",
      description: "Steaming hot, wok-tossed Hakka noodles with crunchy garlic, peppers, and cabbage.",
      isPlaceholder: false,
    },
    {
      id: "ph-4",
      src: IMAGES.masalaDosa,
      title: "Golden Crispy Masala Dosa",
      category: "South Indian Delights",
      description: "Freshly poured rice-crepe stuffed with mashed potatoes, served with coconut and tomato chutneys.",
      isPlaceholder: false,
    },
    {
      id: "ph-placeholder-1",
      src: "",
      title: "Mango Lassi / Drinks",
      category: "Upload Your Photo",
      description: "Placeholder for your refreshing drinks. Replace with a photo of refreshing Mango Lassi or Zeera Soda.",
      isPlaceholder: true,
    },
    {
      id: "ph-placeholder-2",
      src: "",
      title: "Idly & Curry Plate",
      category: "Upload Your Photo",
      description: "Placeholder for your breakfast combo. Replace with a shot of soft steamed Idly with rich chicken or paneer curry.",
      isPlaceholder: true,
    },
    {
      id: "ph-placeholder-3",
      src: "",
      title: "Weekend Fry Pulav",
      category: "Upload Your Photo",
      description: "Placeholder for your weekend specials. Replace with a photograph of our sizzling Gongura Mutton Pulav.",
      isPlaceholder: true,
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-dark-black relative overflow-hidden">
      {/* Divider lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-accent text-xs tracking-[0.2em] text-gold font-bold uppercase block mb-3">
            Sights of Desi Junction
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream tracking-widest uppercase">
            STREET SNAPS
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-3" />
        </div>

        {/* Responsive Photo Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="gallery-grid">
          {photos.map((photo, index) => {
            // Give the truck photo a double-width span on large screens for visual interest
            const isTruck = photo.id === "ph-1";

            if (photo.isPlaceholder) {
              return (
                <div
                  key={photo.id}
                  className="bg-card-black/30 border border-dashed border-gold/25 p-6 rounded-lg flex flex-col items-center justify-center text-center min-h-[300px] group hover:border-gold/50 hover:bg-card-black/50 transition-all duration-300 relative"
                  id={`gallery-item-${photo.id}`}
                >
                  <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center text-gold/40 group-hover:text-gold group-hover:bg-gold/10 transition-all duration-300 mb-4 border border-gold/15">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="font-accent text-[10px] tracking-[0.15em] uppercase font-bold text-gold/60 mb-1">
                    {photo.category}
                  </span>
                  <h3 className="font-sans text-sm font-semibold text-cream-dim/80 group-hover:text-cream transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-cream-dim/40 font-light mt-2 max-w-[200px] leading-relaxed">
                    {photo.description}
                  </p>
                  
                  {/* Action prompt on hover */}
                  <div className="absolute bottom-4 flex items-center space-x-1.5 text-[10px] font-mono uppercase text-gold/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Upload photo here</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={photo.id}
                className={`group relative overflow-hidden rounded-lg bg-card-black border border-white/5 shadow-xl ${
                  isTruck ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
                id={`gallery-item-${photo.id}`}
              >
                {/* Visual Image container with hover zoom */}
                <div className="aspect-square w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-black/95 via-dark-black/10 to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-85" />
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Text overlays */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end text-left translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold mb-1">
                    {photo.category}
                  </span>
                  <h3 className="text-sm font-bold text-cream tracking-wide uppercase">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-cream-dim/75 font-light leading-relaxed mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-sm">
                    {photo.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
