"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import formbricks from "@formbricks/js/website";

export default function FormbricksProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      formbricks.init({
        environmentId: "cm0n0ses80008q4j7d8q08688",
        apiHost: "https://formbricks-q8ccc00448w0ow00ckwg4gsg.digimedic.cz",
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      formbricks.registerRouteChange();
    }
  }, [pathname, searchParams]);

  return null;
}