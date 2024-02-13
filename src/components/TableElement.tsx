import { format } from "date-fns";
import useDrawer from "@/hooks/useDrawer";
import { Icon } from "@iconify/react";
import { useState } from "react";

type ElementProps = {
  path: string;
  expires: Date | null;
  clicks: number;
  url: string;
};

export default function TableElement({
  path,
  expires,
  clicks,
  url,
}: ElementProps) {
  const { isOpen, toggleDrawer } = useDrawer(false);
  const [unlockedInput, setUnlockedInput] = useState({
    path: true,
    redirect: true,
    expires: true,
  });

  const expiresFormat =
    expires !== null ? format(expires, "d/MM/yyyy, kk:mm") : null;

  return (
    <>
      <div className="p-2 w-full flex items-center border-b border-r-neutral-200">
        <p className="flex-1 font-semibold">/{path}</p>
        <p className="flex-1 font-semibold text-[10px] md:text-[14px]">
          {expiresFormat}
        </p>
        <button
          onClick={toggleDrawer}
          title="Open Drawer"
          className="text-2xl transition hover:bg-neutral-200 aspect-square rounded-md p-1"
        >
          <p className="w-[30px] h-[30px]">{isOpen ? "-" : "+"}</p>
        </button>
      </div>
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 border border-t-0 border-neutral-200 rounded-b-md p-2 mx-1 fade-down">
          <div>
            <label>Path</label>
            <div className="p-2 flex items-center gap-4 border border-neutral-200 w-fit rounded-md">
              <input
                autoFocus
                disabled={unlockedInput.path}
                className="p-2"
                type="text"
                value={`/${path}`}
              />
              <button
                onClick={() => setUnlockedInput({ path: !unlockedInput.path })}
                className="transition hover:bg-neutral-200 p-1 rounded-md"
              >
                <Icon icon={"mdi:pencil"} />
              </button>
            </div>
          </div>
          <div>
            <label>Redirect</label>
            <div className="p-2 flex items-center gap-4 border border-neutral-200 w-fit rounded-md">
              <input
                autoFocus
                disabled={unlockedInput.redirect}
                className="p-2"
                type="text"
                value={url}
              />
              <button
                onClick={() =>
                  setUnlockedInput({ redirect: !unlockedInput.redirect })
                }
                className="transition hover:bg-neutral-200 p-1 rounded-md"
              >
                <Icon icon={"mdi:pencil"} />
              </button>
            </div>
          </div>
          <div>
            <label>Expires</label>
            <div className="p-2 flex items-center gap-4 border border-neutral-200 w-fit rounded-md">
              <input
                autoFocus
                className="p-2"
                type="date"
                disabled={unlockedInput.expires}
                value={expiresFormat}
              />
              <button
                onClick={() =>
                  setUnlockedInput({ expires: !unlockedInput.expires })
                }
                className="transition hover:bg-neutral-200 p-1 rounded-md"
              >
                <Icon icon={"mdi:pencil"} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
