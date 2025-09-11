import Room from "../canvas/Room";

function Editor() {
  return (
    <div className="min-h-screen">
      <nav className="mx-auto flex justify-start whitespace-nowrap px-6 py-4 bg-[#fdf8f4] backdrop-blur-sm border-b border-solid border-[#ede8e5] transition-shadow duration-300 hover:shadow-md">
        <a href="/" className="flex gap-3 text-[#222222]">
          <h1 className="text-[#222222] text-2xl font-bold tracking-tight">
            RoomVista
          </h1>
        </a>
      </nav>

      <hr className="border-transparent" />
      <Room />
    </div>
  );
}

export default Editor;
