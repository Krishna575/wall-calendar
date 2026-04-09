"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface HeroImageProps {
  currentDate: Date;
}

// Curated Unsplash landscape images per month (nature/adventure theme)
const MONTH_IMAGES: Record<number, { url: string; credit: string }> = {
  0: {
    url: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=900&q=80",
    credit: "Winter Climb",
  },
  1: {
    url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=900&q=80",
    credit: "Frozen Lake",
  },
  2: {
    url: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1600&q=80",
    credit: "March Meadow Sunrise",
  },
  3: {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    credit: "April Forest Path",
  },
  4: {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
    credit: "Mountain Trail",
  },
  5: {
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80",
    credit: "Summer Ocean",
  },
  6: {
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
    credit: "Valley Vista",
  },
  7: {
    url: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80",
    credit: "Golden Fields",
  },
  8: {
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80",
    credit: "September Mountain Lake",
  },
  9: {
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80",
    credit: "October Mist",
  },
  10: {
    url: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=900&q=80",
    credit: "November Frost",
  },
  11: {
    url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&q=80",
    credit: "Winter Snow",
  },
};

export default function HeroImage({ currentDate }: HeroImageProps) {
  const monthIndex = currentDate.getMonth();
  const image = MONTH_IMAGES[monthIndex] ?? MONTH_IMAGES[0];
  const monthName = format(currentDate, "MMMM").toUpperCase();
  const year = format(currentDate, "yyyy");

  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ height: "220px" }}>
      {/* Background image */}
      <motion.div
        key={monthIndex}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={image.url}
          alt={image.credit}
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark gradient overlay at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* Wave shape at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "60px" }}
      >
        <svg
          viewBox="0 0 900 60"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,30 C150,60 300,0 450,30 C600,60 750,0 900,30 L900,60 L0,60 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Month / Year badge - lower right */}
      <motion.div
        key={`badge-${monthIndex}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute bottom-8 right-6 text-right"
      >
        <p
          className="text-white/80 text-sm font-body tracking-widest"
          style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em" }}
        >
          {year}
        </p>
        <h2
          className="text-white font-display font-bold leading-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}
        >
          {monthName}
        </h2>
      </motion.div>

      {/* Photo credit */}
      <span
        className="absolute bottom-9 left-4 text-white/40 text-xs"
        style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
      >
        {image.credit}
      </span>
    </div>
  );
}