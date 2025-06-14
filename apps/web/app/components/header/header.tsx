export function Header() {
  return (
    <header>
      <nav className="mx-auto flex max-w-full items-center justify-between px-2 py-4 md:p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 inline-flex items-center">
            <h1 className="ml-2 font-semibold text-xl">世界は明るい</h1>
          </a>
        </div>
      </nav>
    </header>
  );
}