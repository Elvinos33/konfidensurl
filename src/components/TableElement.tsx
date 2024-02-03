import { format } from "date-fns";
import useDrawer from "@/hooks/useDrawer";
import { Icon } from "@iconify/react";

type ElementProps = {
  path: string;
  expires: Date | null;
};

export default function TableElement({ path, expires }: ElementProps) {
  const { isOpen, toggleDrawer } = useDrawer(false);
  return (
    <>
      <div className="p-2 w-full flex items-center border-b border-r-neutral-200">
        <p className="flex-1 font-semibold">/{path}</p>
        <p className="flex-1 font-semibold text-[10px] md:text-[14px]">
          {expires !== null
            ? format(expires, "eeee, MMMM do yyyy, kk:mm")
            : expires}
        </p>
        <button
          onClick={toggleDrawer}
          title="Open Drawer"
          className="text-2xl transition hover:bg-neutral-200 aspect-square rounded-md p-1"
        >
          <p className="px-2">{isOpen ? "-" : "+"}</p>
        </button>
      </div>
      {isOpen && (
        <div className="border border-t-0 border-neutral-200 rounded-b-md p-2 mx-1 fade-down">
          <label>Path</label>
          <div className="p-2 flex items-center gap-4 border border-neutral-200 w-fit rounded-md">
            <input className="p-2" type="text" value={`/${path}`} />
            <button className="transition hover:bg-neutral-200 p-1 rounded-md">
              <Icon icon={"mdi:pencil"} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
