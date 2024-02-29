import { format } from "date-fns";
import useDrawer from "@/hooks/useDrawer";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { updateLink } from "@/lib/links";

type ElementProps = {
  path: string;
  expires: Date | number | null;
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
  const [unlockedInput, setUnlockedInput] = useState(false);
  const [urlData, setUrlData] = useState({
    path: path,
    url: url,
    expires: expires,
  });

  const expiresFormat =
    expires !== null ? format(expires, "d/MM/yyyy, kk:mm") : undefined;

  function handleSave() {
    if (unlockedInput) {
      updateLink(urlData);
      setUnlockedInput(false);
    } else {
      setUnlockedInput(true);
    }
  }

  return (
    <>
      <div className="p-2 w-full flex items-center border-b border-r-neutral-200">
        <p className="flex-1 font-semibold">/{path}</p>
        <p className="flex-1 font-semibold text-[10px] md:text-[14px]">
          {expiresFormat}
        </p>
        <p className="text-sm">Clicks:</p>
        <p className="text-sm font-bold ml-1">{clicks}</p>
        <button
          onClick={toggleDrawer}
          title="Open Drawer"
          className="flex items-center ml-2 gap-2 text-2xl transition hover:bg-neutral-200 aspect-square rounded-md p-1"
        >
          <p className="w-[30px] h-[30px]">{isOpen ? "-" : "+"}</p>
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col items-start border border-t-transparent mx-1 p-2 border-neutral-200 rounded-b-md">
          <div className="grid grid-cols-1 md:grid-cols-2 fade-down w-full">
            <div>
              <label>Path</label>
              <div className="p-2 flex items-center gap-4 border border-neutral-200 w-fit rounded-md">
                <input
                  disabled={!unlockedInput}
                  className="p-2"
                  type="text"
                  value={urlData.path}
                  onChange={(e) => {
                    setUrlData({ ...urlData, path: e.target.value });
                    console.log(urlData);
                  }}
                />
              </div>
            </div>
            <div>
              <label>Redirect</label>
              <div className="p-2 flex items-center gap-4 border border-neutral-200 w-fit rounded-md">
                <input
                  disabled={!unlockedInput}
                  className="p-2"
                  type="url"
                  value={urlData.url}
                  onChange={(e) => {
                    setUrlData({ ...urlData, url: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <label>Expires</label>
              <div className="p-2 flex items-center gap-4 border border-neutral-200 w-fit rounded-md">
                <input
                  className="p-2"
                  type="date"
                  disabled={!unlockedInput}
                  value={expiresFormat || ""}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {unlockedInput && (
              <button
                onClick={() => setUnlockedInput(false)}
                className="flex items-center gap-2 p-2 transition hover:scale-105 bg-konfidens-darkGreen text-white mt-4 rounded-md"
              >
                <p>Cancel</p>
                <Icon icon={"mdi:cancel"} />
              </button>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 transition hover:scale-105 p-2 bg-konfidens-darkGreen text-white mt-4 rounded-md"
            >
              <p>{unlockedInput ? "Save" : "Edit"}</p>
              <Icon icon={`${unlockedInput ? "mdi:floppy" : "mdi:pencil"}`} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
