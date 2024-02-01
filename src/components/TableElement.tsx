import { format } from "date-fns";

type ElementProps = {
  path: string;
  expires: Date | null;
};

export default function TableElement({ path, expires }: ElementProps) {
  return (
    <div className="p-2 w-full flex items-center border-b border-r-neutral-200">
      <p className="flex-1 font-semibold">/{path}</p>
      <p className="flex-1 font-semibold text-[10px] md:text-[14px]">
        {expires !== null
          ? format(expires, "eeee, MMMM do yyyy, kk:mm")
          : expires}
      </p>
      <button className="text-2xl transition hover:bg-neutral-200 aspect-square rounded-md p-1">
        <p className="px-2">+</p>
      </button>
    </div>
  );
}
