"use client";
import TableElement from "@/components/TableElement";
import { getAllLinks } from "@/lib/links";
import { useEffect } from "react";

export default function UrlAdmin() {
  useEffect(() => {
    getAllLinks().then((response) => console.log(response));
  }, []);

  return (
    <main className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white border border-neutral-300 rounded-md w-3/4 md:w-1/2 h-1/2 overflow-scroll">
        <TableElement path="Hello" />
      </div>
    </main>
  );
}
