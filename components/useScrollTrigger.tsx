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
        // Element is considered visible when 50% of it is in view
        threshold: 0.5,
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