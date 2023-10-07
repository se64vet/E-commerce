import { useEffect, useState } from "react";

export const useWindowLocation = () => {
  const [mounted, setMounted] = useState(false);
  const location = typeof window !== 'undefined' && window.location ? window.location : '';

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return ''
  }

  return location;
};