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
        <div className="max-w-2xl mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.06] text-cream">
            Location and hours
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="location-grid">
          
          {/* Left Column: Interactive Map Panel (Spans 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6" id="map-container-col">
            <div className="bg-card-black border border-cream/10 p-4 rounded-lg relative overflow-hidden h-full flex flex-col justify-between">
              
              {/* Actual Google Maps IFrame Embed */}
              <div className="w-full h-[350px] sm:h-[400px] rounded overflow-hidden border border-cream/10 relative">
                <iframe
                  title="Desi Junction Naperville Map"
                  src="https://maps.google.com/maps?q=535%20Fairway%20Dr%20Naperville%20IL%2060563&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full filter invert grayscale contrast-125 opacity-80"
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
                    <span className="text-sm font-medium">The truck station</span>
                  </div>
                  <p className="text-sm font-sans font-medium text-cream">
                    {CONTACT_INFO.address}
                  </p>
                  <p className="text-xs text-cream-dim">
                    Naperville, Illinois (Near Fairway Dr & Shore Rd)
                  </p>
                </div>

                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-desi-red hover:bg-desi-red-hover text-white h-11 px-5 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 shrink-0 border border-desi-red"
                  id="get-directions-btn"
                >
                  <Navigation className="w-4 h-4" strokeWidth={1.5} />
                  <span>Get directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Weekly Hours (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col" id="hours-container-col">
            <div className="bg-card-black border border-cream/10 p-8 rounded-lg h-full flex flex-col justify-between relative overflow-hidden">

              <div className="space-y-6">
                {/* Header card info */}
                <div className="flex items-center space-x-3 text-left">
                  <div className="h-10 w-10 flex items-center justify-center bg-cream/5 rounded-lg border border-cream/10 text-cream-dim shrink-0">
                    <Clock className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-serif text-lg font-medium text-cream">
                      Weekly hours
                    </h3>
                    <p className="text-xs text-cream-dim">
                      Fresh Indian street food, served daily
                    </p>
                  </div>
                </div>

                <div className="h-px bg-cream/10 w-full" />

                {/* Day List */}
                <div className="space-y-3.5" id="hours-list">
                  {BUSINESS_HOURS.map((hoursItem) => {
                    const isToday = hoursItem.day === currentDayName;

                    return (
                      <div
                        key={hoursItem.day}
                        className={`flex items-center justify-between p-3 rounded-md transition-colors ${
                          isToday
                            ? "bg-cream/5 border border-cream/10"
                            : "border border-transparent bg-white/[0.01]"
                        }`}
                        id={`hours-row-${hoursItem.day.toLowerCase()}`}
                      >
                        <div className="flex items-center space-x-2.5">
                          {isToday ? (
                            <CalendarCheck className="w-4 h-4 text-gold shrink-0" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-cream/20 shrink-0" />
                          )}
                          <span
                            className={`text-sm  ${
                              isToday ? "text-gold font-semibold" : "text-cream-dim"
                            }`}
                          >
                            {hoursItem.day}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs tabular-nums  ${
                              isToday ? "text-gold font-semibold" : "text-cream-dim"
                            } ${hoursItem.isClosed ? "text-desi-red font-semibold" : ""}`}
                          >
                            {hoursItem.hours}
                          </span>
                          {isToday && (
                            <span className="text-xs text-gold shrink-0">
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
              <div className="mt-8 pt-4 border-t border-white/5 text-left text-xs text-cream-dim/55 leading-relaxed">
                Hours can change during bad weather or street festivals. Call the order line at <strong className="text-gold">{CONTACT_INFO.phoneOrder}</strong> to check the truck is open.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
