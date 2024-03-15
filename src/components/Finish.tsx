import Link from "next/link";

export default function Finish({ url }: { url: string }) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-2xl text-konfidens-darkGreen">
        You have created a shortened link.
      </h2>
      <p className="text-konfidens-darkGreen mx-2">
        Your link is available at{" "}
        <Link className="bg-slate-300 rounded-sm p-1" href={`/${url}`}>
          http://localhost:3000/{url}
        </Link>
      </p>
    </div>
  );
}
