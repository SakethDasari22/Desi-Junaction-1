import React from "react";

export default function About() {
  const features = [
    {
      title: "Real wok-hei",
      desc: "Our Indo-Chinese fried rice and Hakka noodles are tossed in a searing hot wok for that smoky, street-side aroma.",
    },
    {
      title: "Made to order",
      desc: "Nothing sits under heat lamps. Every dosa is poured, every idly steamed and every starter spiced for you.",
    },
    {
      title: "A Chicago first",
      desc: "Chicago's first dedicated Indian street food truck, bringing street flavors to the suburbs.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-dark-black border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7" id="about-text-container">
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.06] text-cream">
              Crisp dosas. Sizzling woks. Pure street joy.
            </h2>

            <div className="space-y-5 text-cream-dim text-base sm:text-lg leading-8 mt-8 max-w-2xl">
              <p>
                Desi Junction started with a simple mission: to bring the late-night energy of India's street stalls to Chicago, where dishes are cooked right in front of you in a fury of sparks, steam and aroma.
              </p>
              <p>
                From paper-thin South Indian dosas and fluffy steamed idlys to fire-cooked Indo-Chinese fried rice, noodles and spicy Andhra Avakay dishes, the menu is a love letter to India's busy street junctions. Every plate is made live with fresh ingredients.
              </p>
              <p className="text-cream">
                No shortcuts. Just fresh street food that makes you feel at home.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-3" id="about-features-container">
            <dl className="divide-y divide-cream/10 border-y border-cream/10">
              {features.map((feat) => (
                <div key={feat.title} className="py-6">
                  <dt className="font-serif text-xl text-cream font-medium">{feat.title}</dt>
                  <dd className="text-cream-dim text-base leading-7 mt-2">{feat.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
