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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Copy & Direct CTA Phone (Spans 5 cols) */}
          <div className="lg:col-span-5 text-left space-y-8" id="catering-info-panel">
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.06] text-cream">
              We cater events
            </h2>

            <div className="space-y-6 text-cream-dim text-base leading-relaxed">
              <p>
                Backyard weddings, birthday parties, team lunches or a street bazaar: Desi Junction brings live street cooking to your venue.
              </p>
              <p>
                Packages are flexible. We can park the red trailer at your event or set up a live cooking stall where guests watch dosas poured and Hakka noodles tossed.
              </p>
            </div>

            {/* Direct Phone Call Button */}
            <div className="space-y-3 pt-4">
              <p className="text-sm text-cream-dim">
                Speak with our catering manager
              </p>
              <a
                href={`tel:${CONTACT_INFO.phoneCatering.replace(/\D/g, "")}`}
                className="inline-flex items-center space-x-3 bg-card-black border border-cream/10 hover:border-cream/30 p-4 rounded-xl group transition-colors"
                id="catering-dial-link"
              >
                <div className="h-11 w-11 flex items-center justify-center bg-cream/5 rounded-lg border border-cream/10 text-cream-dim">
                  <Phone className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <span className="block text-xs text-cream-dim font-semibold">Catering line</span>
                  <span className="text-lg tabular-nums text-cream font-medium">{CONTACT_INFO.phoneCatering}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form / Success Card (Spans 7 cols) */}
          <div className="lg:col-span-7" id="catering-form-panel">
            <div className="bg-card-black border border-cream/10 p-6 sm:p-10 rounded-lg relative overflow-hidden">

              {submitted ? (
                /* Success Message State */
                <div className="text-center py-10 space-y-6 relative z-10" id="catering-success-state">
                  <div className="w-16 h-16 bg-cream/5 text-gold border border-cream/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-gold font-semibold">
                      Inquiry received!
                    </h3>
                    <p className="text-sm text-cream max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Desi Junction. Your catering request has been successfully recorded in our simulated reservation system.
                    </p>
                    <p className="text-xs text-cream-dim max-w-sm mx-auto">
                      We will review your event date (<strong className="text-gold">{formData.eventDate}</strong>) and contact you at <strong className="text-gold">{formData.email}</strong> within 24 business hours.
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={handleResetForm}
                      className="bg-cream/5 hover:bg-cream/5 text-gold border border-cream/10 px-6 py-2.5 rounded text-xs font-semibold transition-colors"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive request form */
                <form onSubmit={handleSubmit} className="space-y-5 text-left relative z-10" id="catering-inquiry-form">
                  <div className="flex items-center space-x-2 text-gold mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-serif font-semibold">Request a quote</span>
                  </div>

                  <h3 className="font-serif text-lg text-cream font-semibold mb-4">
                    Plan your event menu
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-sm text-cream-dim">
                        Full name *
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
                      <label className="block text-sm text-cream-dim">
                        Email address *
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
                      <label className="block text-sm text-cream-dim flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gold/60" />
                        <span>Event date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-dark-black border border-white/10 focus:border-gold rounded p-3 text-sm text-cream outline-none transition-colors tabular-nums"
                      />
                    </div>

                    {/* Headcount */}
                    <div className="space-y-1.5">
                      <label className="block text-sm text-cream-dim flex items-center space-x-1">
                        <Users className="w-3 h-3 text-gold/60" />
                        <span>Estimated guests *</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="10"
                        value={formData.headcount}
                        onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                        className="w-full bg-dark-black border border-white/10 focus:border-gold rounded p-3 text-sm text-cream outline-none transition-colors tabular-nums"
                        placeholder="e.g. 50"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-sm text-cream-dim">
                      Phone number
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
                    <label className="block text-sm text-cream-dim">
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
                    className="w-full bg-desi-red hover:bg-desi-red-hover text-white py-3.5 rounded font-semibold text-xs transition-colors duration-300 border border-desi-red hover: hover:shadow-desi-red/20 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit catering inquiry</span>
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
