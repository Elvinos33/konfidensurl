type ElementProps = {
  path: string;
  date: Date | null;
};

export default function TableElement({ path, date }: ElementProps) {
  return (
    <div className="p-2 w-full flex items-center border-b border-r-neutral-200">
      <p className="flex-1 font-semibold">/{path}</p>
      <p className="flex-1 font-semibold">Forever</p>
      <button className="text-2xl transition hover:bg-neutral-200 aspect-square rounded-md p-1">
        <p className="px-2">+</p>
      </button>
    </div>
  );
}
