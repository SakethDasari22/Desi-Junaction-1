import React, { useState } from "react";
import { Phone, Calendar, Users, Send, CheckCircle, Mail, Sparkles } from "lucide-react";
import { CONTACT_INFO } from "../data/menuData";

export default function Catering() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    headcount: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an API delay
    setTimeout(() => {
      // Retrieve existing inquiries, add new one, save to localStorage
      const existingInquiries = localStorage.getItem("desi_junction_catering_inquiries") || "[]";
      try {
        const inquiries = JSON.parse(existingInquiries);
        inquiries.push({
          ...formData,
          id: Date.now(),
          dateCreated: new Date().toISOString(),
        });
        localStorage.setItem("desi_junction_catering_inquiries", JSON.stringify(inquiries));
      } catch (err) {
        console.error("Failed to save inquiry", err);
      }

      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      headcount: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <section id="catering" className="py-24 bg-dark-black relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-radial-at-c from-gold/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Copy & Direct CTA Phone (Spans 5 cols) */}
          <div className="lg:col-span-5 text-left space-y-8" id="catering-info-panel">
            <div>
              <span className="font-accent text-xs tracking-[0.25em] text-gold font-bold uppercase block mb-3">
                Events & Celebrations
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream tracking-wide uppercase leading-tight">
                WE CATER FOR <br />
                <span className="text-gold italic font-serif capitalize">All Events.</span>
              </h2>
            </div>

            <div className="h-[2px] w-24 bg-gradient-to-r from-gold via-gold/40 to-transparent" />

            <div className="space-y-6 text-cream-dim text-base font-light leading-relaxed">
              <p>
                Whether it is an intimate backyard wedding, a milestone birthday party, a corporate team-building lunch, or a local street bazaar, Desi Junction brings the ultimate live street culinary theater to your venue.
              </p>
              <p>
                Our catering packages are highly customizable. We can set up our red trailer at your event or assemble a beautiful, high-end live cooking stall where guests can watch hot dosas poured or hakka noodles tossed in real-time.
              </p>
            </div>

            {/* Direct Phone Call Button */}
            <div className="space-y-3 pt-4">
              <p className="text-xs uppercase tracking-widest text-gold font-bold font-accent">
                Speak directly with our Catering Manager:
              </p>
              <a
                href={`tel:${CONTACT_INFO.phoneCatering.replace(/\D/g, "")}`}
                className="inline-flex items-center space-x-3 bg-card-black border border-gold/30 hover:border-gold p-4 rounded-lg group transition-all duration-300 shadow-lg scale-100 hover:scale-105"
                id="catering-dial-link"
              >
                <div className="p-3 bg-gold/15 rounded-full border border-gold/20 text-gold group-hover:bg-gold group-hover:text-dark-black transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-cream-dim font-bold">Catering Hot Line</span>
                  <span className="text-lg sm:text-xl font-mono text-gold font-extrabold">{CONTACT_INFO.phoneCatering}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form / Success Card (Spans 7 cols) */}
          <div className="lg:col-span-7" id="catering-form-panel">
            <div className="bg-card-black border border-gold/15 p-6 sm:p-10 rounded-lg shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

              {submitted ? (
                /* Success Message State */
                <div className="text-center py-10 space-y-6 relative z-10" id="catering-success-state">
                  <div className="w-16 h-16 bg-gold/10 text-gold border border-gold/30 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display text-xl tracking-widest text-gold font-bold uppercase">
                      Inquiry Received!
                    </h3>
                    <p className="text-sm text-cream font-light max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Desi Junction. Your catering request has been successfully recorded in our simulated reservation system.
                    </p>
                    <p className="text-xs text-cream-dim/60 max-w-sm mx-auto italic">
                      We will review your event date (<strong className="text-gold">{formData.eventDate}</strong>) and contact you at <strong className="text-gold">{formData.email}</strong> within 24 business hours.
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={handleResetForm}
                      className="bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Request Form */
                <form onSubmit={handleSubmit} className="space-y-5 text-left relative z-10" id="catering-inquiry-form">
                  <div className="flex items-center space-x-2 text-gold mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-accent uppercase tracking-widest font-bold">Request a Quote</span>
                  </div>

                  <h3 className="font-display text-lg tracking-widest text-cream font-bold uppercase mb-4">
                    PLAN YOUR EVENT MENU
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-gold font-bold font-accent">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-dark-black border border-white/10 focus:border-gold rounded p-3 text-sm text-cream outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-gold font-bold font-accent">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-dark-black border border-white/10 focus:border-gold rounded p-3 text-sm text-cream outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Event Date */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-gold font-bold font-accent flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gold/60" />
                        <span>Event Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-dark-black border border-white/10 focus:border-gold rounded p-3 text-sm text-cream outline-none transition-colors font-mono"
                      />
                    </div>

                    {/* Headcount */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-gold font-bold font-accent flex items-center space-x-1">
                        <Users className="w-3 h-3 text-gold/60" />
                        <span>Estimated Guests *</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="10"
                        value={formData.headcount}
                        onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                        className="w-full bg-dark-black border border-white/10 focus:border-gold rounded p-3 text-sm text-cream outline-none transition-colors font-mono"
                        placeholder="e.g. 50"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wider text-gold font-bold font-accent">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-dark-black border border-white/10 focus:border-gold rounded p-3 text-sm text-cream outline-none transition-colors"
                      placeholder="(555) 000-0000"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wider text-gold font-bold font-accent">
                      Describe your Event (Dietary preferences, style of service) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-dark-black border border-white/10 focus:border-gold rounded p-3 text-sm text-cream outline-none transition-colors resize-none"
                      placeholder="e.g., We would like a live dosa station and some starters like jalapeno chicken..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-desi-red hover:bg-desi-red-hover text-white py-3.5 rounded font-bold text-xs uppercase tracking-widest transition-all duration-300 border border-desi-red hover:shadow-lg hover:shadow-desi-red/20 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Catering Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
