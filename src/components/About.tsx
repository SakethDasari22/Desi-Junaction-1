import React from "react";
import { Sparkles, Flame, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const features = [
    {
      icon: <Flame className="w-6 h-6 text-gold" />,
      title: "Real Wok-Hei Style",
      desc: "Our Indo-Chinese fried rice and Hakka noodles are tossed in a searing hot wok to achieve that elusive, authentic street-side smoky aroma.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "100% Made-to-Order",
      desc: "Nothing sits under heat lamps here. Every single dosa is poured, every idly steamed, and every starter spiced specifically for you.",
    },
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      title: "Chicagoland Pioneers",
      desc: "Proudly pioneering as Chicago's very first dedicated Indian street food truck, bringing authentic street flavors right to the suburbs.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-dark-black relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Elegant Copy (Spanning 7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left" id="about-text-container">
            <div>
              <span className="font-accent text-xs tracking-[0.2em] text-gold font-bold uppercase block mb-2">
                Our Story
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream tracking-wide uppercase leading-tight">
                CRISP DOSAS. <br />
                <span className="text-gold italic font-serif capitalize">Sizzling Woks.</span> <br />
                PURE STREET JOY.
              </h2>
            </div>

            {/* Accent gold divider line */}
            <div className="h-[2px] w-24 bg-gradient-to-r from-gold via-gold/50 to-transparent" />

            <div className="space-y-6 text-cream-dim font-light text-base sm:text-lg leading-relaxed">
              <p>
                Desi Junction started with a simple, burning mission: to bring the electric, flavor-packed nightlife of India’s street stalls directly to Chicago. We felt the area was missing that genuine, late-night roadside energy where dishes are cooked right in front of your eyes in a fury of sparks, steam, and intense aromas.
              </p>
              <p>
                From crispy, paper-thin South Indian Dosas and fluffy steamed Idlys to fire-cooked Indo-Chinese fried rice, noodles, and spicy Andhra Avakay dishes, our menu is a love letter to India's bustling street junctions. Every plate is crafted live using fresh, high-quality, authentic ingredients.
              </p>
              <p className="font-semibold text-gold italic">
                No short-cuts. No compromises. Just sizzling, fresh street gastronomy that makes you feel right at home.
              </p>
            </div>
          </div>

          {/* Right Column: Key Pillars / Feature cards (Spanning 5 cols) */}
          <div className="lg:col-span-5 space-y-6" id="about-features-container">
            {features.map((feat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card-black/70 border border-gold/10 p-6 rounded-lg relative overflow-hidden group hover:border-gold/30 transition-all duration-300"
              >
                {/* Subtle gold decorative background glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/2 rounded-full blur-2xl group-hover:bg-gold/5 transition-all duration-300" />
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gold/10 rounded-md border border-gold/20 group-hover:bg-gold/15 transition-all duration-300 shrink-0">
                    {feat.icon}
                  </div>
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-display text-base tracking-widest text-gold font-bold uppercase">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-cream-dim/90 font-light leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
