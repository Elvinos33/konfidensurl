"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactGA from "react-ga4";

export default function Redirect({ url }: { url: string | undefined }) {
  const pathname = usePathname();

  useEffect(() => {
    if (url) window.location.href = url;
    ReactGA.initialize("G-L6ZR8P56VP");
    ReactGA.send({ hitType: "pageview", page: url });
  }, []);
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      {url ? (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-konfidens-green">
            Redirecting to:
          </h1>
          <h2 className="text-2xl font-semibold text-konfidens-darkGreen">
            {url}
          </h2>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-konfidens-green">404</h1>
          <h2 className="text-2xl font-semibold text-konfidens-darkGreen">
            No URL found at {pathname}
          </h2>
        </div>
      )}
    </div>
  );
}
