import { format } from 'date-fns';
import useDrawer from '@/hooks/useDrawer';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { updateLink, deleteLink } from '@/lib/links';

type ElementProps = {
  id: number;
  path: string;
  expires: Date | undefined | null;
  clicks: number;
  url: string;
};

export default function TableElement({
  id,
  path,
  expires,
  clicks,
  url,
}: ElementProps) {
  const { isOpen, toggleDrawer } = useDrawer(false);
  const [unlockedInput, setUnlockedInput] = useState(false);
  const [urlData, setUrlData] = useState({
    id: id,
    path: path,
    url: url,
    expires: expires,
  });

  const expiresFormat = expires ? format(expires, 'dd/MM/yyyy | HH:mm') : '';

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
      <div className='flex w-full items-center border-b border-r-neutral-200 p-2'>
        <p className='flex-1 font-semibold'>/{path}</p>
        <p className='flex-1 text-[10px] font-semibold md:text-[14px]'>
          {expiresFormat}
        </p>
        <p className='text-sm'>Clicks:</p>
        <p className='ml-1 text-sm font-bold'>{clicks}</p>
        <button
          onClick={toggleDrawer}
          title='Open Drawer'
          className='ml-2 flex aspect-square items-center gap-2 rounded-md p-1 text-2xl transition hover:bg-neutral-200'
        >
          <p className='h-[30px] w-[30px]'>{isOpen ? '-' : '+'}</p>
        </button>
      </div>
      {isOpen && (
        <div className='mx-1 flex flex-col items-start rounded-b-md border border-neutral-200 border-t-transparent p-2'>
          <div className='fade-down grid w-full grid-cols-1 md:grid-cols-2'>
            <div>
              <label>Path</label>
              <div className='flex w-fit items-center gap-4 rounded-md border border-neutral-200 p-2'>
                <input
                  disabled={!unlockedInput}
                  className='p-2'
                  type='text'
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
              <div className='flex w-fit items-center gap-4 rounded-md border border-neutral-200 p-2'>
                <input
                  disabled={!unlockedInput}
                  className='p-2'
                  type='url'
                  value={urlData.url}
                  onChange={(e) => {
                    setUrlData({ ...urlData, url: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <label>Expires</label>
              <div className='flex w-fit items-center gap-4 rounded-md border border-neutral-200 p-2'>
                <input
                  className='p-2'
                  type='datetime-local'
                  disabled={!unlockedInput}
                  onChange={(e) =>
                    setUrlData({
                      ...urlData,
                      expires: e.target.value
                        ? new Date(e.target.value)
                        : undefined,
                    })
                  }
                  value={
                    urlData.expires
                      ? format(urlData.expires, "yyyy-MM-dd'T'HH:mm")
                      : ''
                  }
                />
              </div>
            </div>
          </div>
          <div className='flex w-full justify-between gap-2'>
            <div className='flex gap-2'>
              {unlockedInput && (
                <button
                  onClick={() => {
                    setUnlockedInput(false);
                    setUrlData({
                      id,
                      path,
                      url,
                      expires,
                    });
                    console.log(urlData);
                  }}
                  className='bg-konfidens-darkGreen mt-4 flex items-center gap-2 rounded-md p-2 text-sm text-white transition hover:scale-105'
                >
                  <p>Cancel</p>
                  <Icon icon={'mdi:cancel'} />
                </button>
              )}
              {(!unlockedInput ||
                (unlockedInput &&
                  (urlData.id !== id ||
                    urlData.path !== path ||
                    urlData.url !== url ||
                    urlData.expires !== expires))) && (
                <button
                  onClick={handleSave}
                  className='bg-konfidens-darkGreen mt-4 flex items-center gap-2 rounded-md p-2 text-sm text-white transition hover:scale-105'
                >
                  <p>{!unlockedInput ? 'Edit' : 'Save'}</p>
                  <Icon
                    icon={`${!unlockedInput ? 'mdi:pencil' : 'mdi:floppy'}`}
                  />
                </button>
              )}
            </div>
            <button
              onClick={() => deleteLink(id)}
              className='mt-4 flex items-center gap-2 rounded-md border border-red-600 p-2 text-red-600 transition hover:scale-105 hover:bg-red-600 hover:text-white sm:text-sm'
            >
              <p>Delete</p>
              <Icon icon={'mdi:trash-can'} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
