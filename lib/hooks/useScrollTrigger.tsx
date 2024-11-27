import { useEffect, useRef } from 'react';

export const useScrollTrigger = (sectionId: string, onTrigger: (sectionId: string) => void) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    const currentRef = sectionRef.current; // Store ref in a variable
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (initialLoadRef.current && sectionId === 'intro') {
              // Add 2.5-second delay for the first achievement only
              setTimeout(() => {
                onTrigger(sectionId);
                initialLoadRef.current = false;
              }, 2500);
            } else {
              onTrigger(sectionId);
            }
            // Unobserve after triggering to prevent multiple triggers
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Element is considered visible when 20% of it is in view
        threshold: 0.2,
        // Add root margin to trigger slightly before the element comes into view
        rootMargin: '50px 0px',
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
