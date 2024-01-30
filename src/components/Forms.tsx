export function ExternalURLForm() {
  return (
    <>
      <h1 className="text-2xl font-serif">
        Where would you like to redirect to?
      </h1>
      <form
        action=""
        className="w-4/5 md:w-3/5 lg:w-2/5 flex flex-col gap-4 items-center justify-center"
      >
        <input
          className="w-full outline outline-1 outline-neutral-400 transition-all ease-linear duration-[100ms] hover:shadow-sm hover:outline-neutral-600 focus:outline-black focus:outline-2 rounded-md p-2"
          placeholder="Your URL..."
          type="url"
        />
      </form>
    </>
  );
}

export function InternalURLForm() {
  return (
    <>
      <h1 className="text-2xl font-serif">
        Where would you like to redirect from?
      </h1>
      <form
        action=""
        className="w-4/5 md:w-3/5 lg:w-2/5 flex flex-col gap-4 items-center justify-center"
      >
        <input
          className="w-full outline outline-1 outline-neutral-400 transition-all ease-linear duration-[100ms] hover:shadow-sm hover:outline-neutral-600 focus:outline-black focus:outline-2 rounded-md p-2"
          placeholder="Endpoint"
          type="text"
        />
      </form>
    </>
  );
}
