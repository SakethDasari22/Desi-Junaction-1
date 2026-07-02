import React from "react";
import { Star, Quote } from "lucide-react";
import { REVIEWS } from "../data/menuData";

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-dark-black relative overflow-hidden">
      {/* Divider lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="absolute inset-0 bg-radial-at-b from-desi-red/5 via-transparent to-transparent pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-accent text-xs tracking-[0.2em] text-gold font-bold uppercase block mb-3">
            What Chicagoland Says
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream tracking-widest uppercase">
            REVIEWS & CUSTOMER SENTIMENT
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-3" />
        </div>

        {/* 4-Card Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="reviews-grid">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-card-black border border-gold/10 p-8 rounded-lg relative overflow-hidden shadow-xl group hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
              id={`review-card-${review.id}`}
            >
              {/* Backquote watermark decoration */}
              <Quote className="absolute -top-3 -right-3 w-20 h-20 text-gold/[0.03] transform rotate-180 pointer-events-none group-hover:text-gold/[0.06] transition-colors" />

              {/* Star Rating & Quote Block */}
              <div className="space-y-4">
                <div className="flex items-center space-x-1" id={`stars-${review.id}`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                <blockquote className="text-cream-dim text-sm sm:text-base font-light italic leading-relaxed text-left relative z-10">
                  "{review.text}"
                </blockquote>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
                <div className="text-left">
                  <h4 className="text-sm font-bold text-cream tracking-wider uppercase font-sans">
                    {review.name}
                  </h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gold font-accent">
                    Google Reviewer
                  </span>
                </div>
                <span className="text-xs text-cream-dim/30 font-mono">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Portions & Value framing card */}
        <div className="mt-16 bg-card-black/50 border border-gold/10 rounded-lg p-6 max-w-4xl mx-auto text-center" id="reviews-value-framing">
          <p className="text-xs sm:text-sm text-cream-dim/80 font-light leading-relaxed">
            💡 <strong className="text-gold">Our Philosophy on Sizing & Value:</strong> At Desi Junction, we stand firmly on the quality of our ingredients. Every item is cooked completely fresh to your order, utilizing hand-picked spices, fresh vegetables, and premium meats. We focus on culinary craftsmanship, pristine wok-seared flavors, and hygienic preparation rather than mass-produced, cheap placeholders. Thank you for supporting true street-food artistry!
          </p>
        </div>

      </div>
    </section>
  );
}
