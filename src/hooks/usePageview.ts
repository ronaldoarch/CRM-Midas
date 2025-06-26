import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function usePageview() {
  const location = useLocation();

  useEffect(() => {
    fetch("/api/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: location.pathname })
    });
  }, [location]);
} 