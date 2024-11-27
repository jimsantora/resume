import { useEffect, useRef } from 'react';

export const useScrollTrigger = (
  sectionId: string,
  onTrigger: (sectionId: string) => void
) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onTrigger(sectionId);
            // Unobserve after triggering to prevent multiple triggers
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Element is considered visible when 50% of it is in view
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionId, onTrigger]);

  return sectionRef;
};