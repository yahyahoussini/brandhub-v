"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  children,
  className,
}: {
  children: React.ReactNode[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const third = Math.ceil(children.length / 3);

  const firstPart = children.slice(0, third);
  const secondPart = children.slice(third, 2 * third);
  const thirdPart = children.slice(2 * third);

  return (
    <div
      className={cn("w-full", className)}
      ref={containerRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col gap-6"
          style={{ y: translateYFirst }}
        >
          {firstPart.map((child, idx) => (
            <div key={`first-${idx}`}>
              {child}
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col gap-6">
          {secondPart.map((child, idx) => (
            <div key={`second-${idx}`}>
              {child}
            </div>
          ))}
        </div>

        <motion.div 
          className="flex flex-col gap-6"
          style={{ y: translateYThird }}
        >
          {thirdPart.map((child, idx) => (
            <div key={`third-${idx}`}>
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const ParallaxScrollImages = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn("w-full", className)}
      ref={containerRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col gap-4"
          style={{ y: translateYFirst }}
        >
          {firstPart.map((el, idx) => (
            <motion.div
              key={`first-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={el}
                className="h-80 w-full object-cover rounded-xl"
                alt={`Portfolio image ${idx + 1}`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col gap-4">
          {secondPart.map((el, idx) => (
            <motion.div
              key={`second-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={el}
                className="h-80 w-full object-cover rounded-xl"
                alt={`Portfolio image ${idx + third + 1}`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex flex-col gap-4"
          style={{ y: translateYThird }}
        >
          {thirdPart.map((el, idx) => (
            <motion.div
              key={`third-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={el}
                className="h-80 w-full object-cover rounded-xl"
                alt={`Portfolio image ${idx + 2 * third + 1}`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
