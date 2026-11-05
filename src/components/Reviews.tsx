import React from "react";
import { Star } from "lucide-react";
import { REVIEWS } from "../data/menuData";

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-dark-black border-t border-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.06] text-cream">
            What customers say
          </h2>
          <p className="text-cream-dim text-base mt-4">Reviews from Google</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="reviews-grid">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-card-black border border-cream/10 p-7 rounded-xl flex flex-col justify-between"
              id={`review-card-${review.id}`}
            >
              <div>
                <div className="flex items-center gap-0.5" id={`stars-${review.id}`} aria-label={`${review.rating} out of 5 stars`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" strokeWidth={1.5} />
                  ))}
                </div>
                <blockquote className="text-cream text-base leading-7 mt-4">"{review.text}"</blockquote>
              </div>

              <div className="flex items-center justify-between mt-7 pt-4 border-t border-cream/10 text-sm">
                <span className="text-cream font-medium">{review.name}</span>
                <span className="text-cream-dim tabular-nums">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-base text-cream-dim leading-7">
          Every item is cooked fresh to order with hand-picked spices, fresh vegetables and quality meats. We would rather get the wok flavor and the ingredients right than cut corners on portions or prep.
        </p>
      </div>
    </section>
  );
}
