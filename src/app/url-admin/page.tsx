"use client";
import TableElement from "@/components/TableElement";
import { getAllLinks } from "@/lib/links";
import { useEffect, useState } from "react";

export default function UrlAdmin() {
  const [links, setLinks] = useState({
    links: [
      {
        id: 0,
        path: "Loading...",
        expires: null,
        clicks: 0,
        url: "Loading...",
      },
    ],
  });
  useEffect(() => {
    getAllLinks().then((response) => setLinks(response));
  }, []);

  useEffect(() => {
    console.log(links);
  }, [links]);

  return (
    <main className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white border border-neutral-300 rounded-md w-3/4 md:w-1/2 h-1/2 overflow-y-auto animate-fade-down">
        {links.links.map((link) => {
          return <TableElement key={link.id} {...link} />;
        })}
      </div>
    </main>
  );
}
