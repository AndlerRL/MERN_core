import { useEffect, useRef, useState } from 'react';

const useIO = opts => {
  const [elements, setElements] = useState([]);
  const [entries, setEntries] = useState([]);

  const observer = useRef(null);

  const { root, rootMargin, threshold } = opts || {};

  useEffect(() => {
    if (elements.length) {
      observer.current = new IntersectionObserver(ioEntries => {
        setEntries(ioEntries);
      }, {
        root,
        rootMargin,
        threshold
      });

      elements.map(element => observer.current.observe(element));
    }

    return () => {
      if (observer.current)
        observer.current.disconnect();
    };
  }, [elements, root, rootMargin, threshold]);

  return [observer.current, setElements, entries];
};

export default useIO;
