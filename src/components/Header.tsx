import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-konfidens-white z-50 absolute w-full p-5 flex justify-center">
      <nav className="flex justify-between w-full lg:w-1/2">
        <Link
          href={"https://www.konfidens.no"}
          className="flex items-center transition duration-[400ms] hover:scale-105"
        >
          <img
            className="w-[150px] md:w-[200px]"
            src="https://assets-global.website-files.com/631096f39cd600365d745f58/634577ae7f1f31308edfbe77_Konfidens%20logo%20dark%20green.png"
            alt="Konfidens Logo"
          />
        </Link>
        <div className="flex gap-2 md:gap-5 items-center">
          <Link
            className="px-3 py-2 md:px-4 md:py-3 text-[11px] md:text-[14px] rounded-md text-konfidens-white font-semibold bg-konfidens-darkGreen transition duration-[400ms] hover:brightness-90 hover:scale-105"
            href={"/url/admin"}
          >
            Create URL
          </Link>
          <Link
            className="px-3 py-2 md:px-4 md:py-3 text-[11px] md:text-[14px] rounded-md text-konfidens-white font-semibold bg-konfidens-darkGreen transition duration-[400ms] hover:brightness-90 hover:scale-105"
            href={"/url/admin/list"}
          >
            All URLs
          </Link>
        </div>
      </nav>
    </header>
  );
}
