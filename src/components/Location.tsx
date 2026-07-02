import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, CalendarCheck } from "lucide-react";
import { BUSINESS_HOURS, CONTACT_INFO } from "../data/menuData";

export default function Location() {
  const [currentDayName, setCurrentDayName] = useState("");

  useEffect(() => {
    // Get current weekday name in long format (e.g., "Monday")
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    setCurrentDayName(today);
  }, []);

  return (
    <section id="location" className="py-24 bg-dark-black relative overflow-hidden">
      {/* Divider lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-accent text-xs tracking-[0.2em] text-gold font-bold uppercase block mb-3">
            Come Visit Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream tracking-widest uppercase">
            LOCATION & HOURS
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="location-grid">
          
          {/* Left Column: Interactive Map Panel (Spans 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6" id="map-container-col">
            <div className="bg-card-black border border-gold/15 p-4 rounded-lg relative overflow-hidden h-full flex flex-col justify-between shadow-2xl">
              
              {/* Actual Google Maps IFrame Embed */}
              <div className="w-full h-[350px] sm:h-[400px] rounded overflow-hidden border border-gold/10 relative">
                <iframe
                  title="Desi Junction Naperville Map"
                  src="https://maps.google.com/maps?q=535%20Fairway%20Dr%20Naperville%20IL%2060563&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full filter invert grayscale contrast-125 opacity-85"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Map Address Controls */}
              <div className="pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-left space-y-1">
                  <div className="flex items-center space-x-2 text-gold">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-bold font-accent">The Truck Station</span>
                  </div>
                  <p className="text-sm font-sans font-medium text-cream">
                    {CONTACT_INFO.address}
                  </p>
                  <p className="text-xs text-cream-dim/60 font-light">
                    Naperville, Illinois (Near Fairway Dr & Shore Rd)
                  </p>
                </div>

                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-desi-red hover:bg-desi-red-hover text-white px-5 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shrink-0 border border-desi-red shadow-lg"
                  id="get-directions-btn"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Weekly Hours (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col" id="hours-container-col">
            <div className="bg-card-black border border-gold/20 p-8 rounded-lg shadow-2xl h-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/2 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                {/* Header card info */}
                <div className="flex items-center space-x-3 text-left">
                  <div className="p-2.5 bg-gold/10 rounded-md border border-gold/25 text-gold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display text-sm tracking-wider font-extrabold text-gold uppercase">
                      Weekly Schedule
                    </h3>
                    <p className="text-[11px] text-cream-dim/60 font-light">
                      Fresh Indian street food served daily
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-gold/25 w-full" />

                {/* Day List */}
                <div className="space-y-3.5" id="hours-list">
                  {BUSINESS_HOURS.map((hoursItem) => {
                    const isToday = hoursItem.day === currentDayName;

                    return (
                      <div
                        key={hoursItem.day}
                        className={`flex items-center justify-between p-3 rounded-md transition-all ${
                          isToday
                            ? "bg-gold/10 border border-gold/45 shadow-md scale-[1.02] translate-x-1"
                            : "border border-transparent bg-white/[0.01]"
                        }`}
                        id={`hours-row-${hoursItem.day.toLowerCase()}`}
                      >
                        <div className="flex items-center space-x-2.5">
                          {isToday ? (
                            <CalendarCheck className="w-4 h-4 text-gold animate-pulse shrink-0" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-gold/30 shrink-0" />
                          )}
                          <span
                            className={`text-sm tracking-wide ${
                              isToday ? "text-gold font-bold" : "text-cream-dim"
                            }`}
                          >
                            {hoursItem.day}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs font-mono tracking-wider ${
                              isToday ? "text-gold font-bold" : "text-cream-dim/80"
                            } ${hoursItem.isClosed ? "text-desi-red font-semibold" : ""}`}
                          >
                            {hoursItem.hours}
                          </span>
                          {isToday && (
                            <span className="text-[9px] font-accent uppercase font-extrabold bg-gold text-dark-black px-1.5 py-0.5 rounded-sm font-sans tracking-wider shrink-0">
                              Today
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Notice below hours */}
              <div className="mt-8 pt-4 border-t border-white/5 text-left text-[11px] text-cream-dim/55 font-light leading-relaxed">
                ℹ️ Hours are subject to change during extreme weather conditions or special street festivals. Feel free to call our order line at <strong className="text-gold">{CONTACT_INFO.phoneOrder}</strong> to double-check truck availability!
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
