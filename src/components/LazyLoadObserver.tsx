import { useEffect, useRef, useState } from "react";

interface LazyLoadObserverProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}

export const LazyLoadObserver = ({ 
  children, 
  fallback = null,
  rootMargin = "100px"
}: LazyLoadObserverProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
};
