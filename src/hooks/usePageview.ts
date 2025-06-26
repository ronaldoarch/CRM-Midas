import { useRouter } from "next/router";
import { useEffect } from "react";

export default function usePageview() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      fetch("/api/pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: url })
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    // Page inicial
    handleRouteChange(router.asPath);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);
} 