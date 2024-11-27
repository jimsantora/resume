import { useEffect, useRef } from 'react';

export const useScrollTrigger = (
  sectionId: string,
  onTrigger: (sectionId: string) => void
) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current; // Store ref in a variable
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
        // Element is considered visible when 20% of it is in view
        threshold: 0.2,
        // Add root margin to trigger slightly before the element comes into view
        rootMargin: '50px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [sectionId, onTrigger]);

  return sectionRef;
};